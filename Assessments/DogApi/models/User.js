import mongoose from "mongoose";
import validator from "validator";
const { isEmail } = validator;
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"],
		minlength: [3, "Minimum name length is 3 characters"],
		maxlength: [50, "Maximum name length is 50 characters"],
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"],
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum password length is 6 characters"],
	},
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
	next();
});

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("Incorrect password");
	}
	throw Error("Incorrect email");
};

//this string must be the singular of whatever we called the collection in the mongo database
export default mongoose.model("user", userSchema);
