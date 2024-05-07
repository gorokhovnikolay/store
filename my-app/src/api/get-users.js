export const getUsers = async (roleId) => {
	const url = `http://localhost:3003/users?role_id=${roleId}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			return {
				error: 'что то пошло не так, попробуйте позднее',
				users: [],
			};
		}

		const res = await response.json();
		return {
			error: null,
			res,
		};
	} catch (error) {
		console.log(error);
	}
};
