import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {IProduct} from '../../types/types'
import {request} from '../../utils/request'


export const asyncAddProductToCart = createAsyncThunk('user/asyncAddProductToCart', async (product) =>{
	try {
		const {cartProduct} = await request('/cart', 'PATCH', product)
		return cartProduct
	} catch (e) {
		return e
	}
})
export const asyncDeleteProduct = createAsyncThunk('user/asyncDeleteProduct', async (id) =>{
	try {
		const {cartProducts} = await request(`/cart/delete/${id}`, 'PATCH', { id })

		return cartProducts
	} catch (e) {
		return e
	}
})
export const asyncArrangeOrder = createAsyncThunk('user/asyncArrangeOrder', async (products) =>{
	try {
		const {order} = await request(`/order`, 'POST', {products})
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
	orders: IProduct[],
}

const initialState: UserState = {
	id: null,
	login: null,
	roleId: null,
	cart: [],
	orders: [],
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

			return state = {...state, cart: action.payload}
		})
		.addCase(asyncDeleteProduct.fulfilled,(state,action)=>{
			return state = {...state, cart: action.payload}
		})
		.addCase(asyncArrangeOrder.fulfilled,(state,action)=>{
			return state = {...state, orders: action.payload,cart:[]}
		})

	}
})
export const {setUser, logOut} = userSlice.actions
export default userSlice.reducer
