import { useEffect, useRef, useState } from 'react';
import { request } from '../../../utils';
import { ContainerBlock, Input } from '../../../components';
import { ProductItem } from './components';
import { Link } from 'react-router-dom';
import { Button } from '../../../components';
import { UserIcon } from '../../../assets/svg';
import styled from 'styled-components';
import { debounce } from '../../../utils/debounce';
import { Paginations } from '../../main/component/paginations';

const ProductsContainer = ({ className }) => {
	const [refresh, setRefresh] = useState(true);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorServer, setErrorServer] = useState('');
	const [phrase, setPhrase] = useState('');
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(8);
	const [lastPage, setLastPage] = useState(1);
	const [allProductsCount, setAllProductsCount] = useState(1);

	const debounseFn = useRef(debounce(setPhrase, 2000)).current;

	useEffect(() => {
		setIsLoading(true);
		request(`/api/admin/product?phrase=${phrase}&page=${page}&limit=${limit}`)
			.then(({ error, product, lastPage, allCount }) => {
				if (error) {
					setIsLoading(false);
					setErrorServer(error);
					return;
				}
				setData(product);
				setLastPage(lastPage);
				setAllProductsCount(allCount);
			})
			.finally(() => setIsLoading(false));
	}, [refresh, page, limit, phrase]);

	const changeSearchPhrase = (e) => {
		debounseFn(e.target.value);
	};

	return (
		<ContainerBlock errorServer={errorServer} isLoading={isLoading}>
			<div className={className}>
				<div className="category-header">
					<h2>Товары: {allProductsCount}</h2>
					<select
						defaultValue={limit}
						onChange={({ target }) => setLimit(Number(target.value))}
					>
						<option value={'8'}>8</option>
						<option value={'16'}>16</option>
						<option value={'32'}>32</option>
					</select>
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
			<Paginations page={page} setPage={setPage} lastPage={lastPage} />
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
