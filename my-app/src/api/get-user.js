export const getUser = async (userId) => {
	const url = `http://localhost:3003/users/${userId}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			return {
				error: 'что то пошло не так, попробуйте позднее',
				users: [],
			};
		}

		const { login, email, phone } = await response.json();
		return {
			error: null,
			res: {
				login,
				email,
				phone,
			},
		};
	} catch (error) {
		console.log(error);
	}
};
