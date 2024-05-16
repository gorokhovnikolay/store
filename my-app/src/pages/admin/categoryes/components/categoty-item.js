import styled from 'styled-components';
import { Button } from '../../../../components';
import { EditIcon, RemoveIcon } from '../../../../assets/svg';
import { Link } from 'react-router-dom';
import { request } from '../../../../utils';
import { useAppDispatch } from '../../../../storeRtk/hooks.ts';
import { closeModal, visibleModal } from '../../../../storeRtk/slice/modal.ts';
import { addMessage } from '../../../../storeRtk/slice/message-reducer.ts';

const CategoryItemContainer = ({ className, category, setRefresh }) => {
	const dispatch = useAppDispatch();
	const deleteCategory = () => {
		dispatch(
			visibleModal({
				modal: true,
				confirm: () => {
					dispatch(closeModal());
					request(`/admin/category/${category.id}`, 'DELETE').then(
						({ category, error }) => {
							if (error) {
								dispatch(addMessage({ id: Date.now(), message: error }));
								return;
							}
							console.log(category);
							setRefresh((prev) => !prev);
						},
					);
				},
				cancel: () => dispatch(closeModal()),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="category-title">
				<div className="category-name">{category.name}</div>
				<div
					className="color"
					style={{ background: category.color, marginLeft: '10px' }}
				></div>
			</div>
			<div className="category-control">
				<Link to={`/admin/category/edit/${category.id}`}>
					<Button width="35px" height="35px" background="white" padding="0px">
						<EditIcon size="20px" color="green" />
					</Button>
				</Link>
				<Button
					width="35px"
					height="35px"
					background="white"
					padding="0px"
					onClick={() => deleteCategory(category.id)}
				>
					<RemoveIcon size="20px" color="red" />
				</Button>
			</div>
		</div>
	);
};

export const CategoryItem = styled(CategoryItemContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: white;
	border-radius: 25px;
	padding: 0 25px;
	margin: 5px 0;
	& .category-control {
		display: flex;
		margin: 5px 0;
	}
	& .color {
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	& .category-title {
		display: flex;
		align-items: center;
	}
`;
