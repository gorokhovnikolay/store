import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components';
import { EditIcon, RemoveIcon } from '../../../../assets/svg';
import { useDispatch } from 'react-redux';
import { request } from '../../../../utils';
import { useAppDispatch } from '../../../../storeRtk/hooks.ts';
import { closeModal, visibleModal } from '../../../../storeRtk/slice/modal.ts';
import { addMessage } from '../../../../storeRtk/slice/message-reducer.ts';

const ProductItemContainer = ({
	className,
	product: { name, description, price, cat, image, id },
	setRefresh,
}) => {
	const dispatch = useAppDispatch();
	const deleteProduct = () => {
		dispatch(
			visibleModal({
				modal: true,
				confirm: () => {
					dispatch(closeModal());
					request(`/admin/product/${id}`, 'DELETE').then(
						({ message, error }) => {
							if (error) {
								dispatch(addMessage({ id: Date.now(), message: error }));
								return;
							}
							setRefresh((prev) => !prev);
							console.log(message);
						},
					);
				},
				cancel: () => dispatch(closeModal()),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="product-image">
				<img src={image} alt={name}></img>
			</div>
			<div className="product-info">
				<div className="header">
					<div className="product-cat">
						{cat.map(({ id, name, color }) => {
							return (
								<div
									key={id}
									className="product-cat__item"
									style={{ background: color }}
								>
									{name}
								</div>
							);
						})}
					</div>
					<div className="header-btn">
						<Link to={`/admin/products/edit/${id}`}>
							<Button
								width="35px"
								height="35px"
								background="white"
								padding="0px"
							>
								<EditIcon size="20px" color="green" />
							</Button>
						</Link>
						<Button
							width="35px"
							height="35px"
							background="white"
							padding="0px"
							onClick={() => deleteProduct(id)}
						>
							<RemoveIcon size="20px" color="red" />
						</Button>
					</div>
				</div>

				<div className="product-name">{name}</div>
				<div className="product-price">Цена: {price} Рублей</div>
				<div className="product-descr">{`${description.slice(0, 160)}...`}</div>
			</div>
		</div>
	);
};

export const ProductItem = styled(ProductItemContainer)`
	display: flex;
	justify-content: start;
	margin: 5px 0px;
	background: white;
	padding: 10px 25px;
	align-items: center;
	border-radius: 25px;
	& .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	& .header-btn {
		display: flex;
	}
	& img {
		width: 100px;
		height: 100px;
		object-fit: cover;
	}
	& .product-info {
		margin-left: 20px;
		width: 100%;
	}
	& .product-cat {
		display: flex;
		justify-content: flex-start;
	}
	& .product-cat__item {
		color: white;
		margin: 0 5px 0 0;
		padding: 5px;
		border-radius: 8px;
	}
	& .product-name {
		font-size: 16px;
		font-weight: 600;
	}
`;
