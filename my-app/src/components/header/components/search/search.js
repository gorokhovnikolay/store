import styled from 'styled-components';
import { Input } from '../../../input/input';
import { SearchIcon } from '../../../../assets/svg/search';
import { Button } from '../../../button/button';

const SearchContainer = ({ className }) => {
	return (
		<div className={className}>
			<Input>
				<Button width="50px" padding="0px">
					<SearchIcon size="36px" color="white" />
				</Button>
			</Input>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	width: 100%;
	height: 50px;
	border: 2px solid #62bceb;
	border-radius: 25px;
	margin: 0 10px;
`;
