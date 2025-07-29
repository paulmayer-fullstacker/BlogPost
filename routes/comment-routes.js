// routes/api/comment-routes.js
const router = require('express').Router();
const { Comment, User } = require('../models'); 
const { authMiddleware } = require('../utils/auth'); 

// GET comments 
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      attributes: ['id', 'comment_text', 'createdAt'],
      include: [
        {
          model: User, // Include the user who made the comment
          attributes: ['username']
        }
      ]
    });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve comments', error: err.message });
  }
});

// POST /api/comments - Create a new comment
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!req.body.comment_text || !req.body.post_id) {
      return res.status(400).json({ message: 'Comment text and post ID are required.' });
    }
    // Create the new comment in the database
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.user.id, 
    });
    // Send back the newly created comment, and success message
    res.status(200).json(newComment);

  } catch (err) {
    console.error('Error creating comment:', err);
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: err.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ message: 'Failed to create comment', error: err.message });
  }
});

module.exports = router;