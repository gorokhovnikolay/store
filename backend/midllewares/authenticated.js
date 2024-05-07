const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
	try {
		const token = req.cookies.token;
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ _id: id }).populate("cart");
		req.user = user;
		next();
	} catch (e) {
		res.send({
			error: "Что то пошло не так или вы не авторизованы на этом сайте",
		});
	}
};
