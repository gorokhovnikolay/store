import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RightArrowIcon } from '../../../../../assets/svg';

const CategoryItemContainer = ({ cat, className }) => {
	return (
		<Link to={`/category/${cat._id}`}>
			<div className={className}>
				<div>{cat.name}</div>
				<RightArrowIcon color="black" size="30px" />
			</div>
		</Link>
	);
};

export const CategoryItem = styled(CategoryItemContainer)`
	display: flex;
	justify-content: space-between;
	padding: 6px 0px;
	margin: 5px 0;
	border-top: 1px solid #bbbbbb;
`;
