import { createSlice } from '@reduxjs/toolkit';

interface IErrorMessage {
	id:number,
	message:string
}

const initialState:Array<IErrorMessage> = []


const errorMessageSlice = createSlice({
	name: 'errorMessage',
	initialState,
	reducers: {
		addMessage: (state,action:{
			payload: {id:number,message:string};
			type: string;
		})=>{
			return [...state,action.payload]
		},
		deleteMessage: (state,action)=>{
			return state.filter((message)=>message.id !== action.payload)
		}
	},
});

export const { addMessage,deleteMessage } = errorMessageSlice.actions;
export default errorMessageSlice.reducer;
