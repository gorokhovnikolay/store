import styled from 'styled-components';
import { Button } from '../../../button/button';
import { BurgerMenu } from '../../../../assets/svg/menu';

const CatalogButtonContainer = ({ className }) => {
	return (
		<div className={className}>
			<Button>
				<BurgerMenu />
				Каталог
			</Button>
		</div>
	);
};

export const CatalogButton = styled(CatalogButtonContainer)`
	width: 150px;
	height: 50px;
`;
