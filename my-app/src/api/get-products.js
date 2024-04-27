export const getProducts = async () => {
	try {
		const response = await fetch('http://localhost:3003/products');

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
