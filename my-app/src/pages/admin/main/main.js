import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { request } from '../../../utils';
import { useAppDispatch } from '../../../storeRtk/hooks';
import { addMessage } from '../../../storeRtk/slice/message-reducer';

const MainContainer = ({ className }) => {
	const [countOrders, setCountOrders] = useState();
	const [countProducts, setCountProducts] = useState();
	const [countUser, setCountUser] = useState();
	const dispatch = useAppDispatch();
	useEffect(() => {
		request('/admin').then(({ countOrders, countProducts, countUser, error }) => {
			if (error) {
				dispatch(addMessage({ id: Date.now(), message: error }));
				return;
			}
			setCountOrders(countOrders);
			setCountProducts(countProducts);
			setCountUser(countUser);
		});
	}, []);
	return (
		<div className={className}>
			<div>Товаров: {countOrders}</div>
			<div>Заказов: {countProducts}</div>
			<div>Пользавателей: {countUser}</div>
		</div>
	);
};

export const MainAdmin = styled(MainContainer)``;
