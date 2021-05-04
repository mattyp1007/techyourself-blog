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


// Post a comment
// router.post('/post/:id', withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       body: req.body.content,
//       user_id: req.session.user_id,
//       post_id: req.params.id,
//     })
//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
