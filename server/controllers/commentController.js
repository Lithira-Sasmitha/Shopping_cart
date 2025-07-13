const Comment = require('../models/Comment');

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { userId, productId, comment, rating } = req.body;

    const newComment = new Comment({ userId, productId, comment, rating });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Get all comments for a product
exports.getProductComments = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId }).populate('userId', 'name');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get comments' });
  }
};
