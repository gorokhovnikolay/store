const mongoose = require("mongoose");

const CommentShema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		products: {
			type: mongoose.Types.ObjectId,
			ref: "Products",
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", CommentShema);

module.exports = Comment;
