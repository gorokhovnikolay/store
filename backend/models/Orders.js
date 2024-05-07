const mongoose = require("mongoose");

const OrderShema = mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		product: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Products",
			},
		],
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderShema);

module.exports = Order;
