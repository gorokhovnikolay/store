const express = require("express");
const authenticated = require("../midllewares/authenticated");
const { createOrder, getOrders } = require("../controllers/order");
const hasRole = require("../midllewares/hasRole");
const role = require("../constants/role");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const orders = await getOrders();
		res.send({ error: null, orders: orders });
	} catch (e) {
		res.send({ error: e.message, order: null });
	}
});

router.post("/", authenticated, async (req, res) => {
	try {
		const { id } = req.user;
		const order = await createOrder(id, req.body.products);
		res.send({ error: null, order: order });
	} catch (e) {
		res.send({ error: e.message, order: null });
	}
});

module.exports = router;
