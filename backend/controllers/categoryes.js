const Category = require("../models/Category");

function getCategoryes() {
	return Category.find();
}

module.exports = {
	getCategoryes,
};
