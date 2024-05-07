import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { request } from '../../../utils';
import { ContainerBlock } from '../../../components';

const OrdersContainer = ({ className }) => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [serverErorr, setServerError] = useState('');

	useEffect(() => {
		setIsLoading(true);
		request('/order')
			.then(({ error, orders }) => {
				if (error) {
					setServerError(error);
					setIsLoading(false);
					return;
				}
				console.log(orders);
				setOrders(orders);
			})
			.finally(() => setIsLoading(false));
	}, []);
	return (
		<ContainerBlock isLoading={isLoading} serverErorr={serverErorr}>
			<div className={className}>
				{orders.map((order) => {
					return (
						<div key={order._id}>
							<div>{order.user.login}</div>
							{order.product.map((product) => (
								<div key={product._id}>{product.name}</div>
							))}
						</div>
					);
				})}
			</div>
		</ContainerBlock>
	);
};

export const Orders = styled(OrdersContainer)``;
