import User from "../models/User.js";
import jwt from "jsonwebtoken";

//handle errors
const handleErrors = (err) => {
	let errors = { email: "", password: "" };

	// incorrect email
	if (err.message === "Incorrect email") {
		errors.email = "That email is not registered";
	}
	// incorrect password
	if (err.message === "Incorrect password") {
		errors.password = "That password is incorrect";
	}

	//duplicate error code
	if (err.code === 11000) {
		errors.email = "That email is already registered.";
		return errors;
	}

	// validation errors
	if (err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

const maxAge = 24 * 60 * 60; // 1 days in seconds
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

export const signup_post = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.create({ name, email, password });
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

export const login_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);

		const decoded = jwt.decode(token);
		const expiresAt = new Date(decoded.exp * 1000); // convert from seconds to ms
		console.log("JWT expires at:", expiresAt.toLocaleString());

		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

		res.status(200).json({ user: user._id });
	} catch (error) {
		console.log(error);
		const errors = handleErrors(error);
		res.status(400).json({ errors });
	}
};
export const logout_get = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.json({ msg: "User logged out" });
};
