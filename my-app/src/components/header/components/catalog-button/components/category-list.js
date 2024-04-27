import styled from 'styled-components';
import { getCategory } from '../../../../../api/get-category';
import { Link } from 'react-router-dom';
import { CategoryItem } from './category-item';
import { useCategoryesList } from '../../../../../hooks/use-categoryes-list';
import { AdminList } from '../../../../admin-list/admin-list';

const CategoryListContainer = ({ className }) => {
	const { data, isLoading, errorServer } = useCategoryesList(getCategory);

	return (
		<AdminList isLoading={isLoading} errorServer={errorServer}>
			<div className={className}>
				<Link to="/category">Все категории</Link>
				{isLoading && <progress value={null} />}
				{data.map((cat) => {
					return <CategoryItem key={cat.id} cat={cat} />;
				})}
			</div>
		</AdminList>
	);
};

export const CategoryList = styled(CategoryListContainer)``;
