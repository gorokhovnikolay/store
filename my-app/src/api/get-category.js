export const getCategory = async (catId) => {
	const url = catId
		? `http://localhost:3003/category/${catId}`
		: 'http://localhost:3003/category';
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
