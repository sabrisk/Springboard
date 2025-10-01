/** Common config for bookstore. */

let DB_URI;

if (process.env.NODE_ENV === "test") {
	DB_URI =
		process.env.TEST_DATABASE_URL ||
		`postgresql://${process.env.USER}:${process.env.PASS}@localhost:5432/booksdb`;
} else {
	DB_URI =
		process.env.DATABASE_URL ||
		`postgresql://${process.env.USER}:${process.env.PASS}@localhost:5432/booksdb`;
}

module.exports = { DB_URI };
