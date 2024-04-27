const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/user", require("./user"));
router.use("/category", require("./category"));
router.use("/products", require("./product"));
router.use("/admin/category", require("./admin/admin.categoryes"));
router.use("/admin/product", require("./admin/admin.products"));
router.use("/admin/users", require("./admin/admin.users"));

module.exports = router;
