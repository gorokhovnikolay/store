const express = require("express");
const authenticated = require("../../midllewares/authenticated");
const hasRole = require("../../midllewares/hasRole");
const role = require("../../constants/role");
const {
	getUsers,
	getUserById,
	updateUser,
	deleteUserById,
} = require("../../controllers/admin/admin.users");
const userMap = require("../../helpers/userMap");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const users = await getUsers();
		res.send({ error: null, users: users.map(userMap) });
	} catch (e) {
		res.send({ error: e.message, users: null });
	}
});

router.get("/:id", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const user = await getUserById(req.params.id);
		res.send({ error: null, user: userMap(user) });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

router.patch("/:id", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const user = await updateUser(
			req.params.id,
			req.body.login,
			req.body.email,
			req.body.phone,
			req.body.role
		);
		res.send({ error: null, user: userMap(user) });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

router.delete(
	"/:id",
	authenticated,
	hasRole([role.ADMIN]),
	async (req, res) => {
		try {
			await deleteUserById(req.params.id);
			res.send({ error: null, message: "Пользаватель успешно удален" });
		} catch (e) {
			res.send({ error: e.message, message: null });
		}
	}
);

module.exports = router;
