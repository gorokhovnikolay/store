import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header, Footer, Modal } from './components';
import { Admin, CategoryPage, EditUser, Login, Register, Main } from './pages';
import {
	AddUser,
	CategoryAdd,
	Categorys,
	ProductAdd,
	Products,
	ProductEdit,
} from './pages/admin';
import { useLayoutEffect } from 'react';
import { Users } from './pages/admin';

const Content = styled.div`
	text-align: center;
	padding: 25px 25px;
	height: 100%;
`;
const App = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100%;
	max-width: 1200px;
	margin: 0 auto;
	background: #fff;
	border-top: 2px solid #62bceb;
`;

export const Store = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch({ type: 'LOGIN_USER', payload: user });
		}
	}, [dispatch]);

	return (
		<App>
			<Header />
			<Content>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Main />} />
					<Route path="/personal" element={<div>personal</div>} />
					<Route path="/category" element={<CategoryPage />} />
					<Route
						path="/category/:catId"
						element={<div>/category/:catId</div>}
					/>
					<Route
						path="/category/:catId/:productId"
						element={<div>post id</div>}
					/>
					<Route path="/cart" element={<div>cart</div>} />
					<Route path="/acceptorder" element={<div>post id</div>} />
					<Route path="/successorder" element={<div>post id</div>} />
					<Route path="/admin" element={<Admin />}>
						<Route index element={<Admin />} />
						<Route path="users" element={<Users />} />
						<Route path="users/edit/:id" element={<EditUser />} />
						<Route path="users/add/:roleId" element={<AddUser />} />
						<Route path="personal/edit/:id" element={<EditUser />} />
						<Route path="orders" element={<div>admin orders</div>} />
						<Route path="categoryes" element={<Categorys />} />
						<Route path="category/edit/:id" element={<CategoryAdd />} />
						<Route path="category/add" element={<CategoryAdd />} />
						<Route path="products" element={<Products />} />
						<Route path="products/edit/:id" element={<ProductEdit />} />
						<Route path="products/add" element={<ProductAdd />} />
					</Route>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
			<Modal />
		</App>
	);
};
