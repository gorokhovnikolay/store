export const fetchRegister = async ({ login, password, roleId = 2, email }) => {
	const candidate = await fetch(`http://localhost:3003/users?login=${login}`).then(
		(data) => data.json(),
	);
	if (candidate.length > 0) {
		return {
			error: 'Такой пользаватель уже существует',
			res: null,
		};
	}

	const newUser = await fetch(`http://localhost:3003/users`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({
			login,
			password,
			role_id: roleId,
			registred_at: new Date().toISOString(),
			email,
		}),
	}).then((data) => data.json());

	return {
		error: null,
		res: {
			id: newUser.id,
			login: newUser.login,
			roleId: newUser.role_id,
		},
	};
};