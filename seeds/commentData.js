const { Comment } = require('../models');

const commentdata = [
  {
    body: 'Wow this is a great article!',
    post_id: 1,
    user_id: 2,
  },
  {
    body: 'I hate this article.',
    post_id: 1,
    user_id: 3,
  },
  {
    body: 'Umm, this is blatant plagiarism.',
    post_id: 2,
    user_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;

