import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { CatalogButton, HeaderButtons, Search } from './components';
import { Link } from 'react-router-dom';

const HeaderContainer = ({ className }) => {
	const dispatch = useDispatch();
	const userName = useSelector(({ user }) => user.login);
	const logOut = () => {
		localStorage.removeItem('user');
		dispatch({ type: 'LOG_OUT' });
	};

	return (
		<div className={className}>
			<div className="header-top-bar">
				<div>
					<Link to="/">Logo</Link>
				</div>
				<div>
					{userName ? (
						<div onClick={logOut}>{userName}</div>
					) : (
						<Link to="/login">Войти</Link>
					)}
				</div>
			</div>
			<div className="header-bottom-bar">
				<CatalogButton />
				<Search />
				<HeaderButtons />
			</div>
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	& .header-top-bar {
		margin: 10px auto;
		padding: 0 25px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	& .header-bottom-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 25px;
	}
`;
