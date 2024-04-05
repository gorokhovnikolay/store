import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCategory } from '../../../../../api/get-category';
import { Link } from 'react-router-dom';
import { CategoryItem } from './category-item';

const CategoryListContainer = ({ className }) => {
	const [categoryes, setCategoryes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getCategory().then((cat) => {
			setIsLoading(false);
			setCategoryes(cat);
		});
	}, []);

	return (
		<div className={className}>
			<Link to="/category">Все категории</Link>
			{isLoading && <progress value={null} />}
			{categoryes.map((cat) => {
				return <CategoryItem key={cat.id} cat={cat} />;
			})}
		</div>
	);
};

export const CategoryList = styled(CategoryListContainer)``;
