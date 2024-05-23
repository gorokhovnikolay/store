const User = require("../../models/User");
const Products = require("../../models/Products");
const Orders = require("../../models/Orders");

async function getCounts() {
	const [countUser, countOrders, countProducts] = await Promise.all([
		await User.countDocuments(),
		await Products.countDocuments(),
		await Orders.countDocuments(),
	]);
	return { countUser, countOrders, countProducts };
}

module.exports = { getCounts };
