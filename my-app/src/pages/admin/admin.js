import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AdminContainer = ({ className }) => {
	const role = useSelector(({ user }) => user.role);
	if (Number(role) !== 0) {
		return <div> У вас нет прав доступа к данному разделу </div>;
	}
	return (
		<div className={className}>
			<div className="right-panel">
				<div>
					<Link to="/admin">Главная</Link>
				</div>
				<div>
					<Link to="users">Клиенты</Link>
				</div>
				<div>
					<Link to="orders">Заказы</Link>
				</div>
				<div>
					<Link to="categoryes">Категории</Link>
				</div>
				<div>
					<Link to="products">Продукты</Link>
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
`;
