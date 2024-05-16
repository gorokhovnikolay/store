const Product = require("../../models/Products");

async function getProduct(phrase = "", page = 1, limit = 8) {
	const [products, count, allCount] = await Promise.all([
		await Product.find({ name: { $regex: phrase, $options: "i" } })
			.populate("cat")
			.limit(limit)
			.skip((page - 1) * limit),
		await Product.countDocuments({
			name: { $regex: phrase, $options: "i" },
		}),
		await Product.countDocuments(),
	]);

	return { products, lastPage: Math.ceil(count / limit), allCount };
}

async function getProductById(id) {
	const product = await Product.findById(id).populate({
		path: "cat",
	});
	return product;
}

async function createProduct(name, description, price, image, cat) {
	const categoriesId = cat.map((item) => item.value);
	const newProduct = await Product.create({
		name,
		description,
		price,
		image,
		cat: categoriesId,
	});
	await newProduct.populate("cat");
	return newProduct;
}

function updateProduct(id, name, description, price, image, cat) {
	return Product.findByIdAndUpdate(
		{ _id: id },
		{ name, description, price, image, cat },
		{ returnDocument: "after" }
	).populate("cat");
}

function deleteProductById(id) {
	return Product.findByIdAndDelete({ _id: id });
}

module.exports = {
	getProduct,
	getProductById,
	createProduct,
	updateProduct,
	deleteProductById,
};
