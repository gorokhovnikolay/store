import styled from 'styled-components';
import { useCloseCatalog } from '../../hooks';

const CategoryPageContainer = ({ className }) => {
	useCloseCatalog();

	return <div className={className}>CategoryPageContainer</div>;
};

export const CategoryPage = styled(CategoryPageContainer)``;
