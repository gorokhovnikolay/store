export const removeUser = async (id) => {
	try {
		const response = await fetch(`http://localhost:3003/users/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			return {
				error: 'Что то пошло не так, попробуйте позднее',
				res: null,
			};
		}
		return {
			error: null,
			res: 'Пользаватель успешно удален!',
		};
	} catch (error) {}
};
