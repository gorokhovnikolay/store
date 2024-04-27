const mongoose = require("mongoose");
const ROLE = require("../constants/role");
const validator = require("validator");

const UserShema = mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: validator.isEmail,
			},
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			required: true,
			default: ROLE.USER,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserShema);

module.exports = User;
