const express = require("express");
const router = new express.Router();

const Book = require("../models/book");

const {
	get_books,
	get_book_id,
	post_book,
	put_book,
	delete_book,
} = require("../controllers/booksController");

router.get("/", get_books);
router.get("/:id", get_book_id);
router.post("/", post_book);
router.put("/:isbn", put_book);
router.delete("/:isbn", delete_book);

module.exports = router;
