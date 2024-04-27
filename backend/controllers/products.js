const Product = require("../models/Products");

async function getProducts(search = "", limit = 12, page = 1) {
	const [products, count] = await Promise.all([
		await Product.find({ name: { $regex: search, $options: "i" } })
			.populate("cat")
			.limit(limit)
			.skip((page - 1) * limit),
		await Product.countDocuments({
			name: { $regex: search, $options: "i" },
		}),
	]);

	return { products, lastPage: Math.ceil(count / limit) };
}

module.exports = {
	getProducts,
};
