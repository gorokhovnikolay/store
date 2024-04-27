export const addCategory = async ({ name, description, color }) => {
	const candidate = await fetch(`http://localhost:3003/category?name=${name}`).then(
		(data) => data.json(),
	);
	if (candidate.length > 0) {
		return {
			error: 'Такая категория уже существует',
			res: null,
		};
	}

	const newCat = await fetch(`http://localhost:3003/category`, {
		method: 'POST',
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
