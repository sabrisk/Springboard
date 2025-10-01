const Book = require("../models/book");
const { Validator } = require("jsonschema");
const bookSchema = require("../schemas/bookSchema");
const v = new Validator();

async function get_books(req, res, next) {
	try {
		const books = await Book.findAll(req.query);
		return res.json({ books });
	} catch (err) {
		console.error("Error fetching books:", err);
		return next(err);
	}
}

async function get_book_id(req, res, next) {
	try {
		const book = await Book.findOne(req.params.id);
		return res.json({ book });
	} catch (err) {
		return next(err);
	}
}

async function post_book(req, res, next) {
	const validationResult = v.validate(req.body, bookSchema);
	if (!validationResult.valid) {
		// Collect all errors
		const errors = validationResult.errors.map((e) => {
			console.log(e.stack);
			return e.stack;
		});
		return res.status(400).json({ errors });
	}

	try {
		const book = await Book.create(req.body);
		return res.status(201).json({ book });
	} catch (err) {
		return next(err);
	}
}

async function put_book(req, res, next) {
	const validationResult = v.validate(req.body, bookSchema);

	if (!validationResult.valid) {
		const errors = validationResult.errors.map((e) => {
			console.log(e.stack);
			return e.stack;
		});
		return res.status(400).json({ errors });
	}

	try {
		const book = await Book.update(req.params.isbn, req.body);
		return res.json({ book });
	} catch (err) {
		return next(err);
	}
}

async function delete_book(req, res, next) {
	try {
		await Book.remove(req.params.isbn);
		return res.json({ message: "Book deleted" });
	} catch (err) {
		return next(err);
	}
}

module.exports = {
	get_books,
	get_book_id,
	post_book,
	put_book,
	delete_book,
};
