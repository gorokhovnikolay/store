const express = require("express");
const { getProducts } = require("../controllers/products");
const adminProductMap = require("../helpers/adminProductMap");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	try {
		const data = await getProducts(
			req.query.search,
			req.query.limit,
			req.query.page
		);
		const { lastPage, products } = data;
		res.send({
			error: null,
			products: products.map(adminProductMap),
			lastPage,
		});
	} catch (e) {
		res.send({ error: e.message, products: null });
	}
});

module.exports = router;
