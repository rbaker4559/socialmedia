const router = require('express').Router();
const {
  getComments,
  getSingleComment,
  createComment,
} = require('../../controllers/commentController');

router.route('/').get(getComments).post(createComment);

router.route('/:commentId').get(getSingleComment);

module.exports = router;
