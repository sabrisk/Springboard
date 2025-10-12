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

	const res2 = await Dog.deleteMany();

	// Signup first new user
	const res3 = await request(app).post("/signup").send({
		name: "First User",
		email: "firstuser@example.com",
		password: "testpassword",
	});

	firstUserId = res3.body.user;
	firstUserCookie = res3.headers["set-cookie"].find((c) =>
		c.startsWith("jwt=")
	);

	// Signup second new user
	const res4 = await request(app).post("/signup").send({
		name: "Second User",
		email: "seconduser@example.com",
		password: "testpassword",
	});

	secondUserId = res4.body.user;
	secondUserCookie = res4.headers["set-cookie"].find((c) =>
		c.startsWith("jwt=")
	);
	console.log(dogData);

	console.log("firstUserId", firstUserId);
	console.log("secondUserId", secondUserId);
});

afterAll(async () => {
	// Close DB connection
	await mongoose.connection.close();
	console.log("DB connection closed");
});

describe("Dog Adoption API Endpoints", () => {
	it("should insert 20 dogs registered to firstUser/secondUser into the dogs collection", async () => {
		for (let i = 0; i < dogData.length; i++) {
			const res5 = await request(app)
				.post("/dogs")
				.set("Cookie", i % 2 === 0 ? firstUserCookie : secondUserCookie)
				.send(dogData[i]);
			expect(res5.body.success).toBe(true);
			expect(res5.body.message).toBe("Dog created successfully");

			const dog = res5.body.data;
			delete dog._id;
			expect(dog).toEqual({
				...dogData[i],
				initialOwner: i % 2 === 0 ? firstUserId : secondUserId,
				__v: 0,
			});
		}
	});

	it("should delete daisy the dog", async () => {
		const res6 = await Dog.findOne({ name: "Daisy" });
		const daisyId = res6._id.toString();
		const res7 = await request(app)
			.post(`/dogs/${daisyId}/remove`)
			.set("Cookie", secondUserCookie);
		expect(res7.body.success).toBe(true);
		expect(res7.body.message).toBe("Dog deleted successfully");
		expect(res7.body.data.name).toBe("Daisy");
	});
	it("should fail to delete Cooper the dog (incorrect id)", async () => {
		const cooperId = "68ea1efbd55a96d1af8048e4";
		const res8 = await request(app)
			.post(`/dogs/${cooperId}/remove`)
			.set("Cookie", secondUserCookie);
		expect(res8.status).toBe(404);
		expect(res8.body.error).toBe("Dog not found");
	});
	it("should fail to delete Cooper the dog (invalid id)", async () => {
		const cooperId = "68ea2db70f304f";
		const res8 = await request(app)
			.post(`/dogs/${cooperId}/remove`)
			.set("Cookie", secondUserCookie);
		expect(res8.status).toBe(400);
		expect(res8.body.error).toBe("Invalid dog ID");
	});

	it("should fail to adopt Buddy the dog (invalid id)", async () => {
		const buddyId = "68ea2db70f304f";
		const res9 = await request(app)
			.post(`/dogs/${buddyId}/adopt`)
			.set("Cookie", secondUserCookie);
		expect(res9.status).toBe(400);
		expect(res9.body.error).toBe("Invalid dog ID");
	});

	it("should adopt Buddy the dog", async () => {
		const res10 = await Dog.findOne({ name: "Buddy" });
		const buddyId = res10._id.toString();
		const res11 = await request(app)
			.post(`/dogs/${buddyId}/adopt`)
			.set("Cookie", secondUserCookie);
		expect(res11.body.success).toBe(true);
		expect(res11.body.message).toBe(
			"Thank you First User for putting Buddy up for adoption!"
		);
		expect(res11.body.data.name).toBe("Buddy");
		expect(res11.body.data.adoptedBy).toBe(secondUserId.toString());
	});

	it("should adopt Charlie the dog", async () => {
		const res11 = await Dog.findOne({ name: "Charlie" });
		const charlieId = res11._id.toString();
		const res12 = await request(app)
			.post(`/dogs/${charlieId}/adopt`)
			.set("Cookie", secondUserCookie);
		expect(res12.body.success).toBe(true);
		expect(res12.body.message).toBe(
			"Thank you First User for putting Charlie up for adoption!"
		);
		expect(res12.body.data.name).toBe("Charlie");
		expect(res12.body.data.adoptedBy).toBe(secondUserId.toString());
	});

	it("should get all registered dogs for the second user", async () => {
		const res13 = await request(app)
			.get("/dogs/registered")
			.set("Cookie", secondUserCookie);
		expect(res13.body.data.length).toBe(9);
	});
	it("should get 1st page (limit) 4 of registered dogs for the second user", async () => {
		const res13 = await request(app)
			.get("/dogs/registered?page=1&limit=4")
			.set("Cookie", secondUserCookie);
		expect(res13.body.data.length).toBe(4);
	});

	it("should adopt Bella the dog", async () => {
		const res14 = await Dog.findOne({ name: "Bella" });
		const bellaId = res14._id.toString();
		const res15 = await request(app)
			.post(`/dogs/${bellaId}/adopt`)
			.set("Cookie", firstUserCookie);
		expect(res15.body.success).toBe(true);
		expect(res15.body.message).toBe(
			"Thank you Second User for putting Bella up for adoption!"
		);
		expect(res15.body.data.name).toBe("Bella");
		expect(res15.body.data.adoptedBy).toBe(firstUserId.toString());
	});

	it("should get 1st page (limit) 4 of registered dogs for the second user (status available)", async () => {
		const res = await request(app)
			.get("/dogs/registered?page=1&limit=4&status=available")
			.set("Cookie", secondUserCookie);
		expect(res.body.data.length).toBe(4);
		expect(res.body.data[0].name).toBe("Luna");
	});

	it("should get all adopted dogs registered by the first user", async () => {
		const res = await request(app)
			.get("/dogs/registered?status=adopted")
			.set("Cookie", firstUserCookie);
		expect(res.body.data.length).toBe(2);
	});
});
