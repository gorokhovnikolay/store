export const updateCategory = async ({ catId, name, description, color }) => {
	const newCat = await fetch(`http://localhost:3003/category/${catId}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({
			name,
			description,
			color,
		}),
	}).then((data) => data.json());

	return {
		error: null,
		res: {
			id: newCat.id,
			name: newCat.name,
			description: newCat.description,
			color: newCat.color,
		},
	};
};
