const { Types } = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function addProductToCart(id, product) {
	const checkUser = await User.findById({ _id: id }).populate("cart");

	if (checkUser.cart.filter((prod) => prod.id === product.id).length > 0) {
		throw new Error("Такой товар уже есть в корзине");
	}

	const user = await User.findByIdAndUpdate(
		{ _id: id },
		{ $push: { cart: product.id } },
		{ returnDocument: "after" }
	).populate("cart");
	return user.cart;
}

async function deleteProductWithCart(id, productId) {
	const checkUser = await User.findById({ _id: id }).populate("cart");
	const newCart = checkUser.cart.filter((prod) => prod.id !== productId);
	const user = await User.findByIdAndUpdate(
		{ _id: id },
		{ cart: newCart },
		{ returnDocument: "after" }
	).populate("cart");
	return user.cart;
}

async function getCart(token) {
	const { id } = jwt.verify(token, process.env.JWT_SECRET);
	const user = await User.findById(id).populate("cart");
	return user.cart;
}

module.exports = {
	addProductToCart,
	getCart,
	deleteProductWithCart,
};
