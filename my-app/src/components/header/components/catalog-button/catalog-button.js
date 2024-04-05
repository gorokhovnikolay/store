import styled from 'styled-components';
import { Button } from '../../../button/button';
import { BurgerMenu } from '../../../../assets/svg/menu';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../modal/modal';
import { modalVisible } from '../../../../store/selectors';
import { CloseIcon } from '../../../../assets/svg/close';
import { CategoryList } from './components/category-list';

const CatalogButtonContainer = ({ className }) => {
	const isModalVisible = useSelector(modalVisible);
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
				<Modal>
					<CategoryList />
				</Modal>
			)}
		</>
	);
};

export const CatalogButton = styled(CatalogButtonContainer)`
	width: 150px;
	height: 50px;
	z-index: 10;
`;
