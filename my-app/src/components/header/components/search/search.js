import styled from 'styled-components';
import { Input } from '../../../input/input';
import { SearchIcon } from '../../../../assets/svg/search';
import { Button } from '../../../button/button';

const SearchContainer = ({ className }) => {
	return (
		<div className={className}>
			<Input placeholder="Поиск по наименованию..." id="search">
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
