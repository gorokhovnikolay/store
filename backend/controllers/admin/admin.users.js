const User = require("../../models/User");

function getUsers() {
	return User.find();
}

async function getUserById(id) {
	const user = await User.findById(id);
	return user;
}

function updateUser(id, login, email, phone, role) {
	return User.findByIdAndUpdate(
		{ _id: id },
		{ login, email, phone, role },
		{ returnDocument: "after" }
	);
}

function deleteUserById(id) {
	return User.findByIdAndDelete({ _id: id });
}

module.exports = {
	getUsers,
	getUserById,
	updateUser,
	deleteUserById,
};
