import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../storeRtk/hooks.ts';
import { modalClose } from '../storeRtk/slice/modal-catalog.ts';

export const useCloseCatalog = (flag) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(modalClose());
	}, [dispatch, flag]);
};
