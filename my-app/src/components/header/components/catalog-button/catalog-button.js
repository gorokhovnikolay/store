import styled from 'styled-components';
import { Button } from '../../../button/button';
import { BurgerMenu } from '../../../../assets/svg/menu';
import { useDispatch, useSelector } from 'react-redux';
import { ModalCatalog } from '../../../modal-catalog/modal-catalog';
import { modalContainerVisible } from '../../../../store/selectors';
import { CloseIcon } from '../../../../assets/svg/close';
import { CategoryList } from './components/category-list';

const CatalogButtonContainer = ({ className }) => {
	const isModalVisible = useSelector(modalContainerVisible);
	const dispatch = useDispatch();
	return (
		<>
			<div className={className}>
				<Button onClick={() => dispatch({ type: 'MODAL_VISIBLE' })}>
					{isModalVisible ? <CloseIcon size="30px" /> : <BurgerMenu />}
					Каталог
				</Button>
			</div>
			{isModalVisible && (
				<ModalCatalog>
					<CategoryList />
				</ModalCatalog>
			)}
		</>
	);
};

export const CatalogButton = styled(CatalogButtonContainer)`
	width: 150px;
	height: 50px;
	z-index: 10;
`;
