const express = require("express");
const {
	addProductToCart,
	getCart,
	deleteProductWithCart,
} = require("../controllers/cart");
const authenticated = require("../midllewares/authenticated");

const router = express.Router({ mergeParams: true });

router.patch("/", authenticated, async (req, res) => {
	try {
		const { id } = req.user;
		const cartProduct = await addProductToCart(id, req.body.product);
		res.send({ cartProduct: cartProduct, error: null });
	} catch (e) {
		res.send({ cartProduct: null, error: e.message });
	}
});

router.patch("/delete/:id", authenticated, async (req, res) => {
	try {
		const { id } = req.user;
		const cartProduct = await deleteProductWithCart(id, req.params.id);

		res.send({ cartProducts: cartProduct, error: null });
	} catch (e) {
		res.send({ cartProduct: null, error: e.message });
	}
});
router.get("/", async (req, res) => {
	try {
		const token = req.cookies.token;

		const cartProduct = await getCart(token);
		res.send({ cartProduct: cartProduct, error: null });
	} catch (e) {
		res.send({ cartProduct: null, error: e.message });
	}
});

module.exports = router;
