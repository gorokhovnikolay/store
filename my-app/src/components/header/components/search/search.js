import styled from 'styled-components';
import { Input } from '../../../input/input';
import { SearchIcon } from '../../../../assets/svg/search';
import { Button } from '../../../button/button';
import { debounce } from '../../../../utils/debounce';
import { useRef, useState } from 'react';
import { useAppDispatch } from '../../../../storeRtk/hooks.ts';
import { request } from '../../../../utils/request.ts';
import { addMessage } from '../../../../storeRtk/slice/message-reducer.ts';
import { useNavigate } from 'react-router-dom';

const SearchContainer = ({ className }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);

	const setSearchPhrase = (phrase) => {
		if (phrase === '') {
			setProducts([]);
			return;
		}
		request(`/api/products?search=${phrase}`).then(({ error, products }) => {
			if (error) {
				dispatch(addMessage({ id: Date.now(), message: error }));
				return;
			}
			setProducts(products);
		});
	};

	const debounceSearchPhrase = useRef(debounce(setSearchPhrase, 2000)).current;

	const changeSearchPhrase = ({ target }) => {
		debounceSearchPhrase(target.value);
	};
	const navigateToClick = (id) => {
		setProducts([]);
		navigate(`/product/${id}`);
	};

	return (
		<div className={className}>
			<Input
				placeholder="Поиск по наименованию..."
				id="search"
				onChange={changeSearchPhrase}
			>
				<Button width="50px" padding="0px">
					<SearchIcon size="36px" color="white" />
				</Button>
			</Input>
			{products.length > 0 && (
				<div className="search-result">
					<p>Результаты поиска по наименованию:</p>
					{products.map((product) => {
						return (
							<div
								key={product.id}
								onClick={() => navigateToClick(product.id)}
								className="search-item"
							>
								<img
									className="image-prev"
									src={product.image}
									alt={product.name}
								/>
								{product.name}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export const Search = styled(SearchContainer)`
	width: 100%;
	margin: 0 10px;
	& .search-result {
		width: 50%;
		height: auto;
		max-height: 300px;
		overflow: auto;
		padding: 0 25px 10px;
		position: absolute;
		background: white;
		border-radius: 25px;
		border: 1px solid gray;
		z-index: 10;
	}
	& .image-prev {
		width: 50px;
		height: 50px;
		object-fit: contain;
	}
	& .search-item {
		cursor: pointer;
	}
`;
