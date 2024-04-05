import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useCloseCatalog = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'MODAL_CLOSE' });
	}, [dispatch]);
};
