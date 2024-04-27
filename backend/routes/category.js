const express = require("express");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	try {
		const categoryes = await getCategoryes();
		res.send({ error: null, categoryes: categoryes });
	} catch (e) {
		res.send({ error: e.message, categoryes: null });
	}
});

module.exports = router;
