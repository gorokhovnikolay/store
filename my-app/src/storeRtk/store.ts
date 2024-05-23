import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slice/user'
import searchPhraseReducer from './slice/search-phrase'
import modalReducer from './slice/modal'
import modalCatalogReducer from './slice/modal-catalog'
import messageReducer from './slice/message-reducer'


export const store = configureStore({
	reducer: {
		user: userReducer,
		searchPhrase: searchPhraseReducer,
		modal: modalReducer,
		modalCatalog: modalCatalogReducer,
		errorMessage: messageReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
		  serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
