// "name": "Для мужчин",
// "description": "Подходят для мужчин",
// "color": "#ff0000",
// "_id": "662baa1b84488e1106747317",

module.exports = function (category) {
	return {
		name: category.name,
		description: category.description,
		color: category.color,
		id: category._id,
	};
};
