const router = require('express').Router();
const { Comment } = require('../../models');

// Post a comment
router.post('/', async (req, res) => {
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