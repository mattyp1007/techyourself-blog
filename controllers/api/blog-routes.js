const router = require('express').Router();
const { Comment, BlogPost } = require('../../models');

// Post a blog
router.post('/', async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      title: req.body.postTitle,
      body: req.body.postBody,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
    console.log(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Post a comment
router.post('/comments', async (req, res) => {
  try {
    const newComment = await Comment.create({
      body: req.body.commentBody,
      user_id: req.session.user_id,
      post_id: req.body.blogId,
    })
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;