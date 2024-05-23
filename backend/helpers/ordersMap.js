module.exports = function (orders) {
	return {
		id: orders._id,
		product: orders.product.map((product) => {
			return {
				id: product._id,
				name: product.name,
				description: product.description,
				price: product.price,
				image: product.image,
				cat: product.cat,
				comments: product.comments,
			};
		}),
		createdAt: orders.createdAt,
	};
};
