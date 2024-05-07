export const fetchLogin = async ({ login, password }) => {
	const candidate = await fetch(`http://localhost:3003/users?login=${login}`).then(
		(data) => data.json(),
	);

	if (candidate.length === 0) {
		return {
			error: 'Такого пользавателя не существует',
			res: null,
		};
	}

	if (candidate[0]?.password !== password) {
		return {
			error: 'Пароль не верный, проверьте пароль',
			res: null,
		};
	}
	localStorage.setItem(
		'user',
		JSON.stringify({
			id: candidate[0].id,
			login: candidate[0].login,
			roleId: candidate[0].role_id,
		}),
	);
	return {
		error: null,
		res: {
			id: candidate[0].id,
			login: candidate[0].login,
			roleId: candidate[0].role_id,
		},
	};
};
