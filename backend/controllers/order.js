const Order = require("../models/Orders");
const User = require("../models/User");

async function getOrders(page = 1, limit = 8) {
	const [orders, countOrders] = await Promise.all([
		Order.find()
			.populate("user")
			.populate("product")
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		Order.countDocuments(),
	]);
	console.log(page);
	return { orders, lastPage: Math.ceil(countOrders / limit) };
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

async function getordersByUser(user) {
	const orders = await Order.find({ user: user._id }).populate("product");
	return orders;
}

module.exports = {
	createOrder,
	getOrders,
	getordersByUser,
};
