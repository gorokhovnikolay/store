import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {request} from '../../utils/request'
import { useAppSelector } from '../../storeRtk/hooks';
import { Link } from 'react-router-dom';
import { IProduct } from '../../types/types';
import { ContainerBlock } from '../../components/admin-list/admin-list';
import { Paginations } from './component/paginations';
import { Titles } from '../../components/titles/titles';

const titles = [
		'Store - Интернет магазин качественных кед!!!',
		'Store - Большой выбор - приятные цены',
		'Store - Напишите нам если не нашли что искали',
		]

export const MainContainer:React.FC<{className:string}> = ({ className }) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [errorServer, setErrorServer] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [limit,setLimit] = useState(8)
	const [page,setPage] = useState(1)
	const [lastPage,setLastpage] = useState(1)

	const phrases = useAppSelector((state) => state.searchPhrase.phrase);

	useEffect(() => {
		setIsLoading(true);
		request(`/api/products?search=${phrases}&limit=${limit}&page=${page}`)
			.then(({ error, products, lastPage }:{error:string,products:IProduct[],lastPage:number}) => {

				if (error) {
					setIsLoading(false);
					setErrorServer(error);

					return;
				}
				setProducts(products);
				setLastpage(lastPage)
			})
			.finally(() => setIsLoading(false));
	}, [phrases,limit,page]);




	return (<div className={className}>
			<Titles titles={titles} delay={3000} />
			<ContainerBlock errorServer={errorServer} isLoading={isLoading}>
			<h2>Все кеды в одном месте:</h2>
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
				<Paginations setPage={setPage} page={page} lastPage={lastPage}/>
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
