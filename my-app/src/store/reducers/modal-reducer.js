const initialState = {
	modalVisible: false,
	data: [],
};

export const modalReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'MODAL_VISIBLE':
			return { ...state, modalVisible: !state.modalVisible };
		case 'MODAL_CLOSE':
			return initialState;
		default:
			return state;
	}
};
