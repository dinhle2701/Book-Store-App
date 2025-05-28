const Book = require('../models/Book');

// [POST] /api/books
exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
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
        if (!book) return res.status(404).json({ message: 'Book not found' });
        console.log("Get book by id successfully!")
        res.json(book);
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
