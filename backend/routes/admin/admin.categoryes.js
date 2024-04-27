const express = require("express");
const authenticated = require("../../midllewares/authenticated");
const hasRole = require("../../midllewares/hasRole");
const role = require("../../constants/role");
const {
	getCategory,
	createCategory,
	getCategoryById,
	updateCategory,
	deleteCategoryById,
} = require("../../controllers/admin/admin.category");
const categoryMap = require("../../helpers/categoryMap");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const category = await getCategory();
		res.send({ error: null, category: category.map(categoryMap) });
	} catch (e) {
		res.send({ error: e.message, category });
	}
});

router.get("/:id", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const category = await getCategoryById(req.params.id);
		res.send({ error: null, category: categoryMap(category) });
	} catch (e) {
		res.send({ error: e.message, category });
	}
});

router.post("/", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const category = await createCategory(
			req.body.name,
			req.body.description,
			req.body.color
		);
		res.send({ error: null, category: categoryMap(category) });
	} catch (e) {
		res.send({ error: e.message, category: null });
	}
});

router.patch("/:id", authenticated, hasRole([role.ADMIN]), async (req, res) => {
	try {
		const category = await updateCategory(
			req.params.id,
			req.body.name,
			req.body.description,
			req.body.color
		);
		res.send({ error: null, category: categoryMap(category) });
	} catch (e) {
		res.send({ error: e.message, category: null });
	}
});

router.delete(
	"/:id",
	authenticated,
	hasRole([role.ADMIN]),
	async (req, res) => {
		try {
			const category = await deleteCategoryById(req.params.id);
			res.send({ error: null, category: categoryMap(category) });
		} catch (e) {
			res.send({ error: e.message, category });
		}
	}
);

module.exports = router;
