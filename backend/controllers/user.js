const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(login, password, email, phone) {
	const user = await User.findOne({ login, email, phone });

	if (user) {
		throw new Error("Логин занят, попробуйте другой логин");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		login,
		password: hashPassword,
		email,
		phone,
	});

	const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});

	return { newUser, token };
}

async function login(login, password) {
	const user = await User.findOne({ login: login }).populate("cart");

	if (!user) {
		throw new Error("Пользаватель с таком логином не найден");
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) {
		throw new Error("Пароль введен не корректно");
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
	return { user, token };
}

module.exports = {
	register,
	login,
};
