// tests/books.test.js
process.env.NODE_ENV = "test"; // ensures we hit test DB

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let sampleBook = {
	isbn: "1234567890",
	amazon_url: "http://a.co/eobPtX2",
	author: "Jane Doe",
	language: "english",
	pages: 100,
	publisher: "Test Publisher",
	title: "Test Book",
	year: 2025,
};

beforeEach(async () => {
	await db.query("DELETE FROM books");
	await db.query(`
    INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
    VALUES ('1111111111', 'http://a.co/test', 'Author A', 'english', 200, 'Pub A', 'Book A', 2024)
  `);
});

afterAll(async () => {
	await db.end();
});

describe("POST /books", () => {
	test("creates a new book", async () => {
		const res = await request(app).post("/books").send(sampleBook);
		expect(res.statusCode).toBe(201);
		expect(res.body.book).toHaveProperty("isbn", sampleBook.isbn);
		expect(res.body.book).toHaveProperty("title", "Test Book");
	});

	test("rejects missing required field", async () => {
		const badBook = { ...sampleBook };
		delete badBook.title;

		const res = await request(app).post("/books").send(badBook);
		expect(res.statusCode).toBe(400);
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors[0]).toMatch(/title/i);
	});

	test("rejects duplicate isbn", async () => {
		const dupBook = { ...sampleBook, isbn: "1111111111" };

		const res = await request(app).post("/books").send(dupBook);
		expect(res.statusCode).toBe(500); // Postgres error bubbles up unless caught
		expect(res.body.message).toMatch(/duplicate key/i);
	});
});
