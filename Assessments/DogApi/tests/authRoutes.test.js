import request from "supertest";
import app from "../app.js"; // your Express app
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import { Dog } from "../models/Dog.js";
import dogData from "./dogData.js";

dotenv.config();

let firstUserId;
let firstUserCookie;
let secondUserId;
let secondUserCookie;

beforeAll(async () => {
	// Connect to the DB
	const dbURI = process.env.MONGODB_URI;
	await mongoose.connect(dbURI);

	console.log("Connected to DB for tests");

	const res1 = await User.deleteMany();
});

afterAll(async () => {
	// Close DB connection
	await mongoose.connection.close();
	console.log("DB connection closed");
});

describe("Dog Adoption Authentication API Endpoints", () => {
	it("should signup the first user", async () => {
		const res = await request(app).post("/signup").send({
			name: "First User",
			email: "firstuser@example.com",
			password: "testpassword",
		});
		console.log(res.body);

		firstUserId = res.body.user;
		firstUserCookie = res.headers["set-cookie"].find((c) =>
			c.startsWith("jwt=")
		);
		console.log("firstUserId", firstUserId);
		expect(res.body.user).toBeDefined();
	});
	it("should fail to signup the first user (already registered)", async () => {
		const res = await request(app).post("/signup").send({
			name: "First User",
			email: "firstuser@example.com",
			password: "testpassword",
		});

		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.email).toBe("That email is already registered.");
	});
	it("should fail to login the first user (incorrect password)", async () => {
		const res = await request(app).post("/login").send({
			name: "First User",
			email: "firstuser@example.com",
			password: "incorrectpassword",
		});

		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.password).toBe("That password is incorrect");
	});
	it("should fail to login the second user (email not registered)", async () => {
		const res = await request(app).post("/login").send({
			email: "seconduser@example.com",
			password: "testpassword",
		});

		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.email).toBe("That email is not registered");
	});
	it("should fail to login the second user (missing credentials)", async () => {
		const res = await request(app).post("/login").send({
			password: "testpassword",
		});
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.email).toBe("That email is not registered");
	});
	it("should logout", async () => {
		const res = await request(app).get("/logout");
		expect(res.body.msg).toBe("User logged out");
	});
});
