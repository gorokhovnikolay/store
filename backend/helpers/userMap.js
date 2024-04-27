module.exports = function (user) {
	const formatData = (data) =>
		new Date(data).toISOString().slice(0, 16).replace("T", " ");

	return {
		login: user.login,
		email: user.email,
		phone: user.phone,
		role: user.role,
		id: user._id,
		createdAt: formatData(user.createdAt),
	};
};
