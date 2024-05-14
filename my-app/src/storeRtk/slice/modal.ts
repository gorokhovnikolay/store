import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface modalState {
	modal: boolean,
	confirm: ()=>void,
	cancel: () => void
}

const initialState:modalState = {
	modal: false,
	confirm: () => {},
	cancel: () => {},
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		visibleModal: (state,action:PayloadAction<modalState>)=>{
			return state = {...state,
				modal: action.payload.modal,
				confirm: action.payload.confirm,
				cancel: action.payload.cancel, }
		},
		closeModal: (state)=>{
			return state = initialState
		},
	}
})

export const {visibleModal,closeModal } = modalSlice.actions
export default modalSlice.reducer
