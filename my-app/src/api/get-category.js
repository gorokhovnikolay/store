export const getCategory = () =>
	fetch('http://localhost:3003/category').then((data) => data.json());
