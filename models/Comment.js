const { Schema, model } = require('mongoose');
const commentSchema = new Schema({
  text: String,
  username: String,
});

const Comment = model('comment', commentSchema);

module.exports = Comment;
