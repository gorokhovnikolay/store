export const addProduct = async ({ name, description, category, price, image }) => {
	const cat = category.map((cat) => {
		return { id: cat.value, name: cat.label, color: cat.data };
	});

	const newProd = await fetch(`http://localhost:3003/products`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({
			name,
			description,
			price,
			cat,
			image,
		}),
	}).then((data) => data.json());

	return {
		error: null,
		res: newProd,
	};
};
