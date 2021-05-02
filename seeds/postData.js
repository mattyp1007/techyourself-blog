const { BlogPost } = require('../models');

const postdata = [
  {
    title: 'MVC Paradigm',
    body: 'Body text for blog post titled "MVC Paradigm".',
    user_id: 1,
  },
  {
    title: 'Handlebars',
    body: 'Body text for blog post titled "Handlebars".',
    user_id: 2,
  },
  {
    title: 'Bootstrap',
    body: 'Body text for blog post titled "Bootstrap".',
    user_id: 1,
  },
];

const seedPost = () => BlogPost.bulkCreate(postdata);

module.exports = seedPost;
