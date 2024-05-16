import styled from 'styled-components';
import { Button } from '../../../button/button';
import { CartIcon, UserIcon, HeartIcon, SettingsIcon } from '../../../../assets/svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../../storeRtk/hooks';
import { ROLE_ID } from '../../../../constants/role';

const HeaderButtonsContainer = ({ className }) => {
	const roleId = useAppSelector(({ user }) => user.role);
	const countCart = useAppSelector(({ user }) => user?.cart?.length);
	const isDenied = Number(roleId) === ROLE_ID.ADMIN;

	return (
		<div className={className}>
			<Link to="/cart">
				<Button width="50px" padding="7px">
					<CartIcon size="36px" color="white" />
					{countCart !== 0 && countCart !== undefined ? (
						<span className="count">{countCart}</span>
					) : null}
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
			{isDenied && (
				<Link to="/admin">
					<Button width="50px" padding="0px">
						<SettingsIcon size="36px" color="white" />
					</Button>
				</Link>
			)}
		</div>
	);
};

export const HeaderButtons = styled(HeaderButtonsContainer)`
	display: flex;
	height: 50px;
	& button {
		margin-left: 5px;
		position: relative;
	}
	& .count {
		position: absolute;
		top: -9px;
		right: -8px;
		background: #62bceb;
		padding: 5px;
		border-radius: 50%;
		width: 25px;
		height: 25px;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
`;
