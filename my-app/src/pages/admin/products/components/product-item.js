import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components';
import { EditIcon, RemoveIcon } from '../../../../assets/svg';
import { useDispatch } from 'react-redux';
import { request } from '../../../../utils';

const ProductItemContainer = ({
	className,
	product: { name, description, price, cat, image, id },
	setRefresh,
}) => {
	const dispatch = useDispatch();
	const deleteProduct = () => {
		dispatch({
			type: 'VISIBLE_MODAL',
			payload: {
				modal: true,
				confirm: () => {
					dispatch({ type: 'CLOSE_MODAL' });
					request(`/admin/product/${id}`, 'DELETE').then(
						({ message, error }) => {
							if (error) {
								console.log(error);
								return;
							}
							setRefresh((prev) => !prev);
							console.log(message);
						},
					);
				},
				cancel: () => dispatch({ type: 'CLOSE_MODAL' }),
			},
		});
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
