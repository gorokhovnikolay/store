const express = require("express");
const authenticated = require("../../midllewares/authenticated");
const hasRole = require("../../midllewares/hasRole");
const role = require("../../constants/role");
const { getCounts } = require("../../controllers/admin/admin.main");
const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const { countUser, countOrders, countProducts, countCats } =
			await getCounts();
		res.send({
			error: null,
			countUser,
			countOrders,
			countProducts,
			countCats,
		});
	} catch (e) {
		res.send({
			error: e.message,
			countUser: null,
			countOrders: null,
			countProducts: null,
			countCats: null,
		});
	}
});

module.exports = router;
