import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {request} from '../../utils/request'
import { useAppSelector } from '../../storeRtk/hooks';
import { Link } from 'react-router-dom';
import { IProduct } from '../../types/types';
import { ContainerBlock } from '../../components/admin-list/admin-list';

export const MainContainer:React.FC<{className:string}> = ({ className }) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [errorServer, setErrorServer] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const phrases = useAppSelector((state) => state.searchPhrase.phrase);

	useEffect(() => {
		setIsLoading(true);
		request(`/products?search=${phrases}`)
			.then(({ error, products, lastPage }:{error:string,products:IProduct[],lastPage:number}) => {
				if (error) {
					setIsLoading(false);
					setErrorServer(error);
					return;
				}
				setProducts(products);
			})
			.finally(() => setIsLoading(false));
	}, [phrases]);

	return (<div className={className}>
			<div className="main-baner">
				<h1>Store - Интернет магазин качественных кед!!!</h1>
			</div>
			<ContainerBlock errorServer={errorServer} isLoading={isLoading}>
				<div className="main-products">
					{products.map((product) => {
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
		</div>);

};

export const Main = styled(MainContainer)`
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
