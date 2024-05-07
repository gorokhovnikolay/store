import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { request } from '../../utils';
import { Button, ContainerBlock } from '../../components';
import { useDispatch } from 'react-redux';
import { asyncAddProductToCart } from '../../store/actions';

const ProductContainer = ({ className }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [errorServer, setErrorServer] = useState();
	const [isLoading, setIsLoading] = useState();

	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		request(`/product/${productId}`)
			.then(({ error, product }) => {
				if (error) {
					setIsLoading(false);
					setErrorServer(error);
					return;
				}
				setProduct(product);
			})
			.finally(() => setIsLoading(false));
	}, [productId]);

	const addCart = () => {
		dispatch(asyncAddProductToCart({ product })).then(({ message }) =>
			console.log(message),
		);
	};

	return (
		<ContainerBlock errorServer={errorServer} isLoading={isLoading}>
			<div className={className}>
				<div className="product-image">
					<img src={product?.image} alt={product?.className} />
				</div>
				<div className="product-info">
					<h1>{product?.name}</h1>
					<h3>{product?.price}</h3>
					<p>{product?.description}</p>
					<Button
						width="150px"
						height="50px"
						background="green"
						onClick={addCart}
					>
						Купить
					</Button>
				</div>
			</div>
		</ContainerBlock>
	);
};

export const Product = styled(ProductContainer)`
	display: flex;
	justify-content: space-between;
	& .product-image {
		width: 50%;
		padding: 25px;
	}
	& .product-info {
		text-align: start;
		width: 50%;
	}
`;
