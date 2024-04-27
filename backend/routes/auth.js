const express = require("express");
const { register, login } = require("../controllers/user");

const router = express.Router({ mergeParams: true });
const userMap = require("../helpers/userMap");

router.post("/register", async (req, res) => {
	try {
		const { newUser, token } = await register(
			req.body.login,
			req.body.password,
			req.body.email,
			req.body.phone
		);
		res.cookie("token", token);
		res.send({ error: null, user: userMap(newUser) });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password);
		res.cookie("token", token);
		res.send({ error: null, user: userMap(user) });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

router.post("/logout", (req, res) => {
	try {
		res.cookie("token", "");
		res.send({ error: null, user: null });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

module.exports = router;
