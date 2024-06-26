import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {IProduct} from '../../types/types'
import {request} from '../../utils/request'


export const asyncAddProductToCart = createAsyncThunk('user/asyncAddProductToCart', async (product) =>{
	try {
		const cartProduct = await request('/api/cart', 'PATCH', product)

		return cartProduct
	} catch (e) {

		return e
	}
})
export const asyncDeleteProduct = createAsyncThunk('user/asyncDeleteProduct', async (id) =>{
	try {
		const {cartProducts} = await request(`/api/cart/delete/${id}`, 'PATCH', { id })

		return cartProducts
	} catch (e) {
		return e
	}
})
export const asyncArrangeOrder = createAsyncThunk('user/asyncArrangeOrder', async (products) =>{
	try {
		const {order} = await request(`/api/order`, 'POST', {products})
		return order
	} catch (e) {
		return e
	}
})


interface UserState {
	id: null | string,
	login: null | string,
	roleId: null | number,
	cart: IProduct[],
	error: string

}

const initialState: UserState = {
	id: null,
	login: null,
	roleId: null,
	cart: [],
	error:''
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state,action)=>{
			return {...state, ...action.payload}
		},
		logOut: (state)=>{
			return state = initialState
		}
	},
	extraReducers: (builder)=>{
		builder
		.addCase(asyncAddProductToCart.fulfilled,(state,action)=>{
			if(action.payload.error){
				return state = {...state, error: action.payload.error}
			}
			return state = {...state, cart: action.payload.cartProduct || state.cart}
		})
		.addCase(asyncAddProductToCart.rejected,(state,action)=>{
			console.log(action)
			return state = {...state, error: 'Ошибка'}
		})
		.addCase(asyncDeleteProduct.fulfilled,(state,action)=>{
			return state = {...state, cart: action.payload}
		})
		.addCase(asyncArrangeOrder.fulfilled,(state,action)=>{
			return state = {...state,cart:[]}
		})

	}
})
export const {setUser, logOut} = userSlice.actions
export default userSlice.reducer
