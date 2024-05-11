import {createSlice } from "@reduxjs/toolkit";

interface PhraseState{
	phrase: string
}

const initialState: PhraseState = {
	phrase: ''
}


export const phraseSlice = createSlice({
	name: 'phrase',
	initialState,
	reducers: {
		setPhrase: (state,action)=>{
			return {...state, phrase: action.payload}
		}
	}
})
export const {setPhrase} = phraseSlice.actions
export default phraseSlice.reducer
