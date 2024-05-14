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
				setOrders(orders);
			})
			.finally(() => setIsLoading(false));
	}, []);
	return (
		<ContainerBlock isLoading={isLoading} serverErorr={serverErorr}>
			<div className={className}>
				{orders.map((order) => {
					const sum = order.product.reduce((acc, item) => {
						acc = acc + Number(item.price);
						return acc;
					}, 0);

					return (
						<div key={order._id} className="order-item">
							<div className="order-info">
								<div className="order-client">
									Клиент: {order.user.email} "{order.user.login}"
								</div>
								<div className="order-date">
									Дата: {order.createdAt.replace('T', ' ').slice(0, 16)}
								</div>
								<div className="order-price">Сумма:{sum}</div>
							</div>

							<div className="order-position">
								<span className="position-title">Позиции:</span>
								{order.product.map((product) => (
									<div key={product._id}>{product.name}</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</ContainerBlock>
	);
};

export const Orders = styled(OrdersContainer)`
	& .order-item {
		margin: 5px 0;
	}
	& .order-info {
		display: flex;
		justify-content: space-between;
		background: white;
		padding: 5px 25px;
	}
	& .order-position {
		background: white;
		padding: 5px 25px 25px;
	}
	& .position-title {
		font-size: 18px;
		font-weight: 600;
	}
`;
