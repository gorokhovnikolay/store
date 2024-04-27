const mongoose = require("mongoose");

const ProductsShema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		cat: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Category",
				required: true,
			},
		],
		image: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true }
);

const Products = mongoose.model("Products", ProductsShema);

module.exports = Products;
