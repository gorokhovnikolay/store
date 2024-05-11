const initialState = {
	id: null,
	login: null,
	roleId: null,
	cart: [],
	orders: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'LOGIN_USER':
			return { ...state, ...payload };
		case 'LOG_OUT':
			return initialState;
		case 'ADD_TO_CART':
			return { ...state, cart: payload.product };
		case 'DELETE_PRODUCT_WITH_CART':
			return { ...state, cart: payload.product };
		case 'CREATE_ORDER':
			return { ...state, orders: [...state.orders, payload.product], cart: [] };
		default:
			return state;
	}
};
