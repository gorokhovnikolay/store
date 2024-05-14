const Product = require("../../models/Products");

function getProduct() {
	return Product.find().populate("cat");
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
