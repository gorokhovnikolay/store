import { useEffect, useRef, useState } from 'react';
import { request } from '../../../utils';
import { ContainerBlock, Input } from '../../../components';
import { ProductItem } from './components';
import { Link } from 'react-router-dom';
import { Button } from '../../../components';
import { UserIcon } from '../../../assets/svg';
import styled from 'styled-components';
import { debounce } from '../../../utils/debounce';

const ProductsContainer = ({ className }) => {
	const [refresh, setRefresh] = useState(true);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorServer, setErrorServer] = useState('');
	const [phrase, setPhrase] = useState('');

	const debounseFn = useRef(debounce(setPhrase, 2000)).current;

	useEffect(() => {
		setIsLoading(true);
		request('/admin/product')
			.then(({ error, product }) => {
				if (error) {
					setIsLoading(false);
					setErrorServer(error);
					return;
				}
				setData(product);
			})
			.finally(() => setIsLoading(false));
	}, [refresh]);

	const changeSearchPhrase = (e) => {
		debounseFn(e.target.value);
	};

	return (
		<ContainerBlock errorServer={errorServer} isLoading={isLoading}>
			<div className={className}>
				<div className="category-header">
					<h2>Товары: {data.length}</h2>
					<Input
						placeholder="Поиск по наименованию..."
						id="search"
						onChange={changeSearchPhrase}
					/>
					<div className="users-panel">
						<Link to={`/admin/products/add`}>
							<Button width="50px" padding="0px">
								+<UserIcon size="36px" color="white" />
							</Button>
						</Link>
					</div>
				</div>
				{data.map((product) => {
					return (
						<ProductItem
							key={product.id}
							product={product}
							setRefresh={setRefresh}
						/>
					);
				})}
			</div>
		</ContainerBlock>
	);
};

export const Products = styled(ProductsContainer)`
	& .category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
