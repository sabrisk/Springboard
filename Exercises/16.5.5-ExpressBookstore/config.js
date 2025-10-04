/** Common config for bookstore. */

let DB_URI;

if (process.env.NODE_ENV === "test") {
	DB_URI = process.env.TEST_DATABASE_URL;
} else {
	DB_URI = process.env.DATABASE_URL;
}

module.exports = { DB_URI };
