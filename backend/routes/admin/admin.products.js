const express = require("express");
const authenticated = require("../../midllewares/authenticated");
const hasRole = require("../../midllewares/hasRole");
const role = require("../../constants/role");
const {
	getProduct,
	createProduct,
	getProductById,
	deleteProductById,
	updateProduct,
} = require("../../controllers/admin/admin.product");
const adminProductMap = require("../../helpers/adminProductMap");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const product = await getProduct();
		res.send({ error: null, product: product.map(adminProductMap) });
	} catch (e) {
		res.send({ error: e.message, category: null });
	}
});

router.get("/:id", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const product = await getProductById(req.params.id);
		res.send({ error: null, product: adminProductMap(product) });
	} catch (e) {
		res.send({ error: e.message, product: null });
	}
});

router.post("/", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const product = await createProduct(
			req.body.name,
			req.body.description,
			req.body.price,
			req.body.image,
			req.body.cat
		);
		res.send({ error: null, product: adminProductMap(product) });
	} catch (e) {
		res.send({ error: e.message, product: null });
	}
});

router.patch("/:id", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const product = await updateProduct(
			req.params.id,
			req.body.name,
			req.body.description,
			req.body.price,
			req.body.image,
			req.body.cat
		);
		res.send({ error: null, product: adminProductMap(product) });
	} catch (e) {
		res.send({ error: e.message, product: null });
	}
});

router.delete(
	"/:id",
	authenticated,
	hasRole([role.ADMIN]),
	async (req, res) => {
		try {
			await deleteProductById(req.params.id);
			res.send({ error: null, message: "Товар успешно удален" });
		} catch (e) {
			res.send({ error: e.message, message: null });
		}
	}
);

module.exports = router;
