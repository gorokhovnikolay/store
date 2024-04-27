module.exports = function (product) {
	return {
		id: product._id,
		name: product.name,
		description: product.description,
		price: product.price,
		image: product.image,
		comments: product.comments,
		cat: product.cat.map((product) => {
			return {
				id: product._id,
				name: product.name,
				description: product.description._id,
				color: product.color,
			};
		}),
	};
};
