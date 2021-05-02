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
          model: Comment,
          attributes: [
            'id',
            'body',
            'user_id',
            'created_at',
          ],
        },
      ],
    });

    const blogpost = dbBlogPostData.get({ plain: true });
    console.log('Post data:',blogpost);
    res.render('post', { ...blogpost, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
