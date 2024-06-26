const { Post, Comment } = require('../models');

module.exports = {
  async getComments(req, res) {
    try {
      const comment = await Comment.find();
      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getSingleComment(req, res) {
    try {
      const comment = await Comment.findOne({ _id: req.params.commentId });

      if (!comment) {
        return res.status(404).json({ message: 'No comment found with that id' });
      }

      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body);
      const post = await Post.findOneAndUpdate(
        { _id: req.body.postId },
        { $push: { comments: comment._id } },
        { new: true }
      );

      if (!post) {
        return res
          .status(404)
          .json({ message: 'test' });
      }

      res.json({ message: 'comment created' });
    } catch (err) {
      console.error(err);
    }
  },
};
