import styled from 'styled-components';
import { Button } from '../../../button/button';
import { CartIcon, UserIcon, HeartIcon } from '../../../../assets/svg';

const HeaderButtonsContainer = ({ className }) => {
	return (
		<div className={className}>
			<Button width="50px" padding="7px">
				<CartIcon size="36px" color="white" />
			</Button>
			<Button width="50px" padding="0px">
				<HeartIcon size="36px" color="white" />
			</Button>
			<Button width="50px" padding="0px">
				<UserIcon size="36px" color="white" />
			</Button>
		</div>
	);
};

export const HeaderButtons = styled(HeaderButtonsContainer)`
	display: flex;
	height: 50px;
	& button {
		margin-left: 5px;
	}
`;
