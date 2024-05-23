import styled from 'styled-components';
import { CatalogButton, HeaderButtons, Search } from './components';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../storeRtk/hooks.ts';
import { logOut } from '../../storeRtk/slice/user.ts';
import { ExitIcon } from '../../assets/svg/exit.tsx';

const HeaderContainer = ({ className }) => {
	const dispatch = useAppDispatch();
	const userName = useAppSelector((state) => state.user.login);
	const navigate = useNavigate();
	const logOutClick = () => {
		request('/logout', 'POST').then(({ error, user }) => {
			localStorage.removeItem('user');
			dispatch(logOut());
			navigate('/');
		});
	};

	return (
		<div className={className}>
			<div className="header-top-bar">
				<div>
					<Link to="/">Logo</Link>
				</div>
				<div>
					{userName ? (
						<div className="log-out-link" onClick={logOutClick}>
							{userName}
							<ExitIcon color="black" />
						</div>
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
	& .log-out-link {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
`;
