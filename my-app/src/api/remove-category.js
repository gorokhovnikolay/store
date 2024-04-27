export const removeCategory = async (id) => {
	try {
		const response = await fetch(`http://localhost:3003/category/${id}`, {
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
