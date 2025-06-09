const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), bookController.createBook);

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

router.post('/review', verifyToken, bookController.createReview);
router.get('/review/:bookId', bookController.getReviewsByBook);

module.exports = router;
