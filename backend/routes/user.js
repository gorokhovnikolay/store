const express = require("express");
const authenticated = require("../midllewares/authenticated");
const userMap = require("../helpers/userMap");
const oredrsMap = require("../helpers/ordersMap");
const { getordersByUser } = require("../controllers/order");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
	try {
		const user = req.user;
		res.send({ error: null, user: userMap(user) });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

router.get("/orders", authenticated, async (req, res) => {
	try {
		const user = req.user;
		const orders = await getordersByUser(user);
		res.send({ error: null, orders: orders.map(oredrsMap) });
	} catch (e) {
		res.send({ error: e.message, orders: null });
	}
});

module.exports = router;
