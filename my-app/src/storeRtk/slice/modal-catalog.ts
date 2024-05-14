import { createSlice } from "@reduxjs/toolkit";

interface IModalCatalog{
	modalVisible: boolean,
	data: string[],
}
const initialState: IModalCatalog = {
	modalVisible: false,
	data: [],
}

const modalCatalogSlice = createSlice({
	name:'modalCatalog',
	initialState,
	reducers:{
		modalVisible: (state)=>{
			return state = {...state, modalVisible: !state.modalVisible}
		},
		modalClose: (state)=>{
			return state = initialState
		}
	}
})

export const {modalVisible, modalClose} = modalCatalogSlice.actions
export default modalCatalogSlice.reducer
