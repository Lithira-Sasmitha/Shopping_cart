const express = require('express');
const { addComment, getProductComments } = require('../controllers/commentController');
const router = express.Router();

router.post('/', addComment);
router.get('/:productId', getProductComments);

module.exports = router;
