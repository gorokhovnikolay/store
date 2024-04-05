import styled from 'styled-components';
import { Button } from '../../../button/button';
import { CartIcon, UserIcon, HeartIcon, SettingsIcon } from '../../../../assets/svg';
import { Link } from 'react-router-dom';

const HeaderButtonsContainer = ({ className }) => {
	return (
		<div className={className}>
			<Link to="/cart">
				<Button width="50px" padding="7px">
					<CartIcon size="36px" color="white" />
				</Button>
			</Link>
			<Button width="50px" padding="0px">
				<HeartIcon size="36px" color="white" />
			</Button>
			<Link to="/personal">
				<Button width="50px" padding="0px">
					<UserIcon size="36px" color="white" />
				</Button>
			</Link>
			<Link to="/admin">
				<Button width="50px" padding="0px">
					<SettingsIcon size="36px" color="white" />
				</Button>
			</Link>
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
