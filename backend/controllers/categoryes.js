const Category = require("../models/Category");

function getCategory() {
	return Category.find();
}

module.exports = {
	getCategory,
};
