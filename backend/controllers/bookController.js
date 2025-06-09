const Book = require('../models/Book');
const { Review } = require('../models/Review');

// [POST] /api/books
exports.createBook = async (req, res) => {
    try {
        const imgPath = req.file ? `static/uploads/${req.file.filename}` : null;

        const book = new Book({
            ...req.body,
            img: imgPath
        });

        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// [GET] /api/books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        console.log("Get all book successfully!")
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// [GET] /api/books/:id
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });

        const reviews = await Review.find({ book: req.params.id })
            .populate('user', 'username') // Lấy username từ User
            .sort({ createdAt: -1 });

        const result = {
            ...book.toObject(),
            reviews: reviews.map(r => ({
                _id: r._id,
                rating: r.rating,
                comment: r.comment,
                createdAt: r.createdAt,
                user: r.user?.iss,
                username: r.user?.username || "Unknown"
            }))
        };

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// [PUT] /api/books/:id
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        console.log("Update book successfully!")
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// [DELETE] /api/books/:id
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        console.log("Delete book successfully!")
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createReview = async (req, res) => {
    const { bookId, rating, comment } = req.body;
    const userId = req.user?.id;

    if (!bookId || !rating || !comment || !userId) {
        return res.status(400).json({ message: "Thiếu thông tin." });
    }

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Không tìm thấy sách." });

        const review = new Review({
            book: bookId,
            rating,
            comment,
            user: userId
        });

        await review.save();
        res.status(201).json({ message: "Đánh giá thành công", review });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi tạo đánh giá", error: err.message });
    }
};




// [GET] /api/reviews/:bookId
exports.getReviewsByBook = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy đánh giá", error: err.message });
    }
};