import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useCloseCatalog } from '../../hooks';
import { Link, useParams } from 'react-router-dom';
import { request } from '../../utils';
import { useEffect, useState } from 'react';
import { ContainerBlock } from '../../components';

const CategoryPageContainer = ({ className }) => {
	const [errorServer, setErrorServer] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const { catId } = useParams();

	useCloseCatalog(catId);

	const phrases = useSelector(({ searchPhrase }) => searchPhrase.phrase);

	useEffect(() => {
		setIsLoading(true);
		request(`/product/category/${catId}?search=${phrases}`)
			.then(({ products, error }) => {
				if (error) {
					setIsLoading(false);
					setErrorServer(error);
					return;
				}
				setData(products);
			})
			.finally(() => setIsLoading(false));
	}, [catId, phrases]);

	return (
		<ContainerBlock errorServer={errorServer} isLoading={isLoading}>
			<div className={className}>
				{data.map((product) => {
					return (
						<Link
							className="product-link"
							key={product.id}
							to={`/product/${product.id}`}
						>
							<div className="product-card">
								<img src={product.image} alt={product.name} />
								<div className="card-price">{product.price} р</div>
								<div className="card-name">{product.name}</div>
							</div>
						</Link>
					);
				})}
			</div>
		</ContainerBlock>
	);
};

export const CategoryPage = styled(CategoryPageContainer)`
	display: flex;
	flex-wrap: wrap;
	& .main-products {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	& .main-baner {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 250px;
		background: red;
		border-radius: 25px;
		margin-bottom: 25px;
	}
	& .main-baner h1 {
		color: white;
		font-size: 40px;
		font-weight: 900;
	}
	& .product-card {
		border: 1px solid gray;
		border-radius: 25px;
		padding: 25px;
		margin: 12px;
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
	& a.product-link {
		width: 25%;
	}
`;
