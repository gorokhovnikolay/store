import styled from 'styled-components';
import { CatalogButton, HeaderButtons, Search } from './components';

const HeaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="header-top-bar">
				<div></div>
				<div>Войти</div>
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
