const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all blogposts for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogposts = dbBlogPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      blogposts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post
// Use the custom middleware before allowing the user to access the BlogPost
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'body',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        
      ],
    });

    const blogpost = dbBlogPostData.get({ plain: true });
    res.render('post', { ...blogpost, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get user's posts for homepage
router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn){
    res.redirect('/login');
    return;
  }
  const userPostData = await BlogPost.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ]
  });
  const userPosts = userPostData.map((post) =>
    post.get({ plain: true })
  );
  const user = userPosts[0].user.username;
  console.log(userPosts);
  res.render('dash', { userPosts, user, loggedIn: req.session.loggedIn });
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
