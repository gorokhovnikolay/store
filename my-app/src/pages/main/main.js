import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { request } from '../../utils';
import { useSelector } from 'react-redux';

const MainContainer = ({ className }) => {
	const [products, setProducts] = useState([]);
	const [errorServer, setErrorServer] = useState('');

	const phrases = useSelector(({ searchPhrase }) => searchPhrase.phrase);

	useEffect(() => {
		request(`/products?search=${phrases}`).then(({ error, products, lastPage }) => {
			if (error) {
				setErrorServer(error);
				return;
			}
			setProducts(products);
		});
	}, [phrases]);

	return (
		<div className={className}>
			{products.map((product) => {
				return <div key={product.id}>{product.name}</div>;
			})}
		</div>
	);
};

export const Main = styled(MainContainer)``;
