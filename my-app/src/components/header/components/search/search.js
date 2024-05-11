import styled from 'styled-components';
import { Input } from '../../../input/input';
import { SearchIcon } from '../../../../assets/svg/search';
import { Button } from '../../../button/button';
import { debounce } from '../../../../utils/debounce';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../../../storeRtk/hooks.ts';
import { setPhrase } from '../../../../storeRtk/slice/search-phrase.ts';

const SearchContainer = ({ className }) => {
	const dispatch = useAppDispatch();

	const setSearchPhrase = (phrase) => {
		dispatch(setPhrase(phrase));
	};

	const debounceSearchPhrase = useRef(debounce(setSearchPhrase, 2000)).current;

	const changeSearchPhrase = ({ target }) => {
		debounceSearchPhrase(target.value);
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
		</div>
	);
};

export const Search = styled(SearchContainer)`
	width: 100%;
	margin: 0 10px;
`;
