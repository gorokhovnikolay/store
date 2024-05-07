const Category = require("../../models/Category");

function getCategory() {
	return Category.find();
}

function getCategoryById(id) {
	return Category.findById({ _id: id });
}

function createCategory(name, description, color) {
	return Category.create({ name, description, color });
}

function updateCategory(id, name, description, color) {
	return Category.findByIdAndUpdate(
		{ _id: id },
		{ name, description, color }
	);
}

function deleteCategoryById(id) {
	return Category.findByIdAndDelete({ _id: id });
}

module.exports = {
	getCategory,
	createCategory,
	getCategoryById,
	updateCategory,
	deleteCategoryById,
};
