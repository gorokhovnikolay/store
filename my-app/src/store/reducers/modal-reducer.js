const initialState = {
	modal: false,
	confirm: () => {},
	cancel: () => {},
};

export const modalReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'VISIBLE_MODAL':
			return {
				...state,
				modal: payload.modal,
				confirm: payload.confirm,
				cancel: payload.cancel,
			};
		case 'CLOSE_MODAL':
			return initialState;
		default:
			return state;
	}
};
