import {useDispatch,useSelector,TypedUseSelectorHook} from 'react-redux'
import {RootState,AppDispatch} from './store'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
