const initialState = {
	phrase: '',
};

export const searchPhraseReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SEARCH_PHRASE':
			return { ...state, phrase: payload };
		default:
			return state;
	}
};
