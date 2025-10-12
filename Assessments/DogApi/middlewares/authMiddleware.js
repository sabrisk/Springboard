import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// check json web token exists & is valid
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect("/login");
			} else {
				next();
			}
		});
	} else {
		res.json({ message: "Please login" });
	}
};

// check current user
export const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};
