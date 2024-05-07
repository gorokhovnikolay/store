const express = require("express");
const {
	getProducts,
	getOneProduct,
	getProductByCategory,
} = require("../controllers/products");
const adminProductMap = require("../helpers/adminProductMap");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	try {
		const data = await getProducts(
			req.query.search,
			req.query.limit,
			req.query.page,
			req.query.category
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
router.get("/:id", async (req, res) => {
	try {
		const product = await getOneProduct(req.params.id);

		res.send({
			error: null,
			product: adminProductMap(product),
		});
	} catch (e) {
		res.send({ error: e.message, product: null });
	}
});
router.get("/category/:categoryId", async (req, res) => {
	try {
		const { products, lastPage } = await getProductByCategory(
			req.params.categoryId,
			req.query.search
		);
		res.send({
			error: null,
			products: products.map(adminProductMap),
			lastPage,
		});
	} catch (e) {
		res.send({ error: e.message, products: null, lastPage: null });
	}
});

module.exports = router;
