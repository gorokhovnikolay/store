const express = require("express");
const authenticated = require("../midllewares/authenticated");
const userMap = require("../helpers/userMap");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
	try {
		const user = req.user;
		res.send({ error: null, user: userMap(user) });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

module.exports = router;
