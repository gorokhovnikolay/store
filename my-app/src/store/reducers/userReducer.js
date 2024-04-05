const initialState = {
	id: null,
	login: null,
	roleId: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'LOGIN_USER':
			return { ...state, ...payload };
		case 'LOG_OUT':
			return initialState;
		default:
			return state;
	}
};
