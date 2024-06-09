const connection = require('../config/connection');
const { Post, Comment } = require('../models');
const {
  getRandomName,
  getRandomComments,
  getRandomPost,
  genRandomIndex,
} = require('./data');

console.time('seeding');

connection.once('open', async () => {
  
  let postCheck = await connection.db.listCollections({ name: 'posts' }).toArray();
  if (postCheck.length) {
    await connection.dropCollection('posts');
  }

  let commentCheck = await connection.db.listCollections({ name: 'comments' }).toArray();
  if (commentCheck.length) {
    await connection.dropCollection('comments');
  }


  const comments = [...getRandomComments(10)];
  const posts = [];


  const makePost = (text) => {
    posts.push({
      text,
      username: getRandomName().split(' ')[0],
      comments: [comments[genRandomIndex(comments)]._id],
    });
  };

  await Comment.collection.insertMany(comments);


  comments.forEach(() => makePost(getRandomPost(10)));

  await Post.collection.insertMany(posts);

  console.table(comments);
  console.table(posts);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
