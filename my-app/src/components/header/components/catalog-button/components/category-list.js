import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CategoryItem } from './category-item';
import { ContainerBlock } from '../../../../admin-list/admin-list';
import { useEffect, useState } from 'react';
import { request } from '../../../../../utils';

const CategoryListContainer = ({ className }) => {
	const [errorServer, setErrorServer] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		request('/api/category')
			.then(({ error, categoryes }) => {
				if (error) {
					setIsLoading(false);
					setErrorServer(error);
					return;
				}
				setData(categoryes);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<ContainerBlock isLoading={isLoading} errorServer={errorServer}>
			<div className={className}>
				<Link to="/category">Все категории</Link>
				{isLoading && <progress value={null} />}
				{data.map((cat) => {
					return <CategoryItem key={cat._id} cat={cat} />;
				})}
			</div>
		</ContainerBlock>
	);
};

export const CategoryList = styled(CategoryListContainer)``;
