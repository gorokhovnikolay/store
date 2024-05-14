import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {
	CategoriesIcon,
	HomeIcon,
	OrdersIcon,
	ShoesIcon,
	UsersIcon,
} from '../../assets/svg';

const sizes = {
	size: '23px',
	color: 'black',
};

const AdminContainer = ({ className }) => {
	const role = useSelector(({ user }) => user.role);
	if (Number(role) !== 0) {
		return <div> У вас нет прав доступа к данному разделу </div>;
	}
	return (
		<div className={className}>
			<div className="right-panel">
				<div className="panel-item">
					<Link to="/admin">
						<HomeIcon {...sizes} />
						<span className="item-title">Главная</span>
					</Link>
				</div>
				<div className="panel-item">
					<Link to="users">
						<UsersIcon {...sizes} />
						<span className="item-title">Клиенты</span>
					</Link>
				</div>
				<div className="panel-item">
					<Link to="orders">
						<OrdersIcon {...sizes} />
						<span className="item-title">Заказы</span>
					</Link>
				</div>
				<div className="panel-item">
					<Link to="categoryes">
						<CategoriesIcon {...sizes} />
						<span className="item-title">Категории</span>
					</Link>
				</div>
				<div className="panel-item">
					<Link to="products">
						<ShoesIcon {...sizes} />
						<span className="item-title">Продукты</span>
					</Link>
				</div>
			</div>
			<div className="left-panel">
				<Outlet />
			</div>
		</div>
	);
};

export const Admin = styled(AdminContainer)`
	display: flex;
	height: 100%;
	& .right-panel {
		width: 20%;
		text-align: justify;
		background: #62bceb;
		padding: 25px 25px;
		border-radius: 25px;
		height: fit-content;
	}
	& .left-panel {
		width: 100%;
		margin-left: 25px;
		background: #62bceb;
		border-radius: 25px;
		padding: 25px;
		text-align: start;
	}
	& .panel-item {
		display: flex;
		align-items: center;
		margin: 5px 0;
		padding: 2px 2px;
	}
	& .panel-item:hover {
		background-color: white;
		border-radius: 12px;
	}
	& .item-title {
		margin-left: 5px;
		font-size: 17px;
	}
`;
