export const updateUser = async ({ id, login, password, email, phone }) => {
	const user =
		password !== '' ? { login, password, email, phone } : { login, email, phone };

	try {
		const response = await fetch(`http://localhost:3003/users/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});
		if (!response.ok) {
			return {
				error: 'Что то пошло не так, попробуйте позднее',
				res: null,
			};
		}
		return {
			error: null,
			res: 'Данные сохранены!',
		};
	} catch (error) {}
};
