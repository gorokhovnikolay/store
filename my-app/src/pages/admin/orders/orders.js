import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { request } from '../../../utils';
import { ContainerBlock } from '../../../components';
import { Link } from 'react-router-dom';
import { HeaderOrdersAdmin } from './components/header';

const OrdersContainer = ({ className }) => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [serverErorr, setServerError] = useState('');
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState('8');
	const [lastPage, setLastPage] = useState(1);

	useEffect(() => {
		setIsLoading(true);
		request(`/order?page=${page}&limit=${limit}`)
			.then(({ error, orders, lastPage }) => {
				if (error) {
					setServerError(error);
					setIsLoading(false);
					return;
				}
				setOrders(orders);
				setLastPage(lastPage);
			})
			.finally(() => setIsLoading(false));
	}, [page, limit]);
	return (
		<ContainerBlock isLoading={isLoading} serverErorr={serverErorr}>
			<div className={className}>
				<HeaderOrdersAdmin
					lastPage={lastPage}
					page={page}
					limit={limit}
					setPage={setPage}
					setLimit={setLimit}
				/>

				{orders.map((order) => {
					const sum = order.product.reduce((acc, item) => {
						acc = acc + Number(item.price);
						return acc;
					}, 0);

					return (
						<div key={order._id} className="order-item">
							<div className="order-info">
								<div className="order-client">
									<span className="info-title">Клиент:</span>{' '}
									{order.user.email} "{order.user.login}"
								</div>
								<div className="order-date">
									<span className="info-title">Дата:</span>{' '}
									{order.createdAt.replace('T', ' ').slice(0, 16)}
								</div>
								<div className="order-price">
									<span className="info-title">Сумма:</span>
									{sum}
								</div>
							</div>

							<div className="order-position">
								<span className="position-title">Позиции:</span>
								{order.product.map((product) => (
									<div key={product._id}>
										<Link
											to={`/product/${product._id}`}
											target="blank"
											className="link-to-product"
										>
											{product.name}
										</Link>
									</div>
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
		border-radius: 25px;
		padding: 10px;
		background: white;
	}
	& .order-info {
		display: flex;
		justify-content: space-between;
		background: white;
		padding: 5px 25px;
		border-bottom: 1px solid gray;
	}
	& .order-position {
		background: white;
		padding: 5px 25px 25px;
	}
	& .position-title {
		font-size: 18px;
		font-weight: 600;
	}
	& .info-title {
		font-size: 17px;
		font-weight: 600;
	}
	& .link-to-product {
		text-decoration: underline;
		color: #18303d;
	}
	& .link-to-product:hover {
		text-decoration: none;
	}
	& .header-orders {
		display: flex;
		justify-content: space-between;
	}
`;
