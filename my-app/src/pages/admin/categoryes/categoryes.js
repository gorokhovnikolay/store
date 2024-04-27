import styled from 'styled-components';
import { AdminList } from '../../../components';
import { CategoryItem } from './components/categoty-item';
import { Link } from 'react-router-dom';
import { Button } from '../../../components';
import { UserIcon } from '../../../assets/svg';
import { useEffect, useState } from 'react';
import { request } from '../../../utils';

const CategoryesContainer = ({ className }) => {
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorServer, setErrorServer] = useState('');
	const [data, setData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		request('/admin/category')
			.then(({ error, category }) => {
				setIsLoading(false);
				if (error) {
					setErrorServer(error);
					return;
				}
				setData(category);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refresh]);

	return (
		<AdminList errorServer={errorServer} isLoading={isLoading}>
			<div className={className}>
				<div className="category-header">
					<h2>Категории: {data.length}</h2>
					<div className="users-panel">
						<Link to={`/admin/category/add`}>
							<Button width="50px" padding="0px">
								+<UserIcon size="36px" color="white" />
							</Button>
						</Link>
					</div>
				</div>
				{data.map((category) => {
					return (
						<CategoryItem
							key={category.id}
							category={category}
							setRefresh={setRefresh}
						/>
					);
				})}
			</div>
		</AdminList>
	);
};

export const Categorys = styled(CategoryesContainer)`
	& .category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
