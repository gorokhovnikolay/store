const Order = require("../models/Orders");
const User = require("../models/User");

async function getOrders() {
	const orders = await Order.find()
		.populate("user")
		.populate("product")
		.sort({ createdAt: -1 });
	return orders;
}

async function createOrder(id, products) {
	const productsId = products.map((product) => product._id);
	const order = await Order.create({
		user: id,
		product: productsId,
	});
	if (order) {
		await User.findByIdAndUpdate(
			{ _id: id },
			{ cart: [] },
			{ returnDocument: "after" }
		);
	}

	await order.populate("product");
	return order;
}

module.exports = {
	createOrder,
	getOrders,
};
