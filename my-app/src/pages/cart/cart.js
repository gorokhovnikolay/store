import { Button } from '../../components/';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useAppDispatch } from '../../storeRtk/hooks.ts';
import { asyncDeleteProduct, asyncArrangeOrder } from '../../storeRtk/slice/user.ts';
import { useNavigate } from 'react-router-dom';

const CartContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const products = useSelector(({ user }) => user.cart);

	const deleteProduct = (id) => {
		dispatch(asyncDeleteProduct(id));
	};

	const arrangeOrder = () => {
		dispatch(asyncArrangeOrder(products)).then(() => navigate('/successorder'));
	};

	const sum = useMemo(() => {
		return products.reduce((acc, product) => {
			return (acc = acc + Number(product.price));
		}, 0);
	}, [products]);

	if (products.length === 0) {
		return <div>Корзина пуста</div>;
	}

	return (
		<div className={className}>
			{products.map((cartProduct) => {
				return (
					<div key={cartProduct._id} className="product-card">
						<Button
							width="50px"
							height="50px"
							background="red"
							position="absolute"
							top="5px"
							right="5px"
							onClick={() => deleteProduct(cartProduct._id)}
						>
							Х
						</Button>
						<img src={cartProduct.image} alt={cartProduct.name} />
						<div className="card-price">{cartProduct.price} р</div>
						<div className="card-name">{cartProduct.name}</div>
					</div>
				);
			})}
			<div className="arrange-order">
				<h3>Итого:{sum}</h3>
				<Button width="200px" background="#00a505" onClick={arrangeOrder}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	display: flex;
	flex-wrap: wrap;
	& .product-card {
		border: 1px solid gray;
		border-radius: 25px;
		padding: 25px;
		margin: 12px;
		width: 25%;
		position: relative;
	}
	& .product-card img {
		width: 200px;
		height: 200px;
		object-fit: cover;
	}
	& .card-name {
		text-align: justify;
		font-size: 18px;
		font-weight: 600;
		height: 50px;
	}
	& .card-price {
		font-size: 24px;
		font-weight: 700;
		color: red;
		text-align: justify;
	}
	& .arrange-order {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		margin-top: 50px;
	}
`;
