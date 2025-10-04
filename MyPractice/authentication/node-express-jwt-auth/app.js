const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.DATABASE_URI;
mongoose
	.connect(dbURI)
	.then((result) => {
		console.log("Server listening");
		app.listen(3000);
	})
	.catch((err) => console.log(err));

// routes
app.get("*"), checkUser;
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => {
	res.render("smoothies");
});
app.use(authRoutes);

// //cookies

// app.get("/set-cookies", (req, res) => {
// 	// res.setHeader("Set-Cookie", "newUser=true");
// 	res.cookie("newUser", false);
// 	res.cookie("isEmployee", true, {
// 		maxAge: 1000 * 60 * 60 * 24, //expire after a day
// 		httpOnly: true, //can't access cookie from frontend js
// 	});
// 	res.send("you got the cookie");
// });

// app.get("/read-cookies", (req, res) => {
// 	const cookies = req.cookies;
// 	console.log(cookies);
// 	res.json(cookies);
// });
