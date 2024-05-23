import styled from 'styled-components';
import { Button } from '../../../button/button';
import { BurgerMenu } from '../../../../assets/svg/menu';
import { ModalCatalog } from '../../../modal-catalog/modal-catalog';
import { CloseIcon } from '../../../../assets/svg/close';
import { CategoryList } from './components/category-list';
import { useAppDispatch, useAppSelector } from '../../../../storeRtk/hooks.ts';
import { modalVisible } from '../../../../storeRtk/slice/modal-catalog.ts';

const CatalogButtonContainer = ({ className }) => {
	const isModalVisible = useAppSelector((state) => state.modalCatalog.modalVisible);

	const dispatch = useAppDispatch();
	return (
		<>
			<div className={className}>
				<Button onClick={() => dispatch(modalVisible())}>
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
