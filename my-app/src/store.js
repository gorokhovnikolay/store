import { useAppDispatch, useAppSelector } from './storeRtk/hooks.ts';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header, Footer, Modal, Tooltip } from './components';
import {
	Admin,
	CategoryPage,
	EditUser,
	Login,
	Register,
	Main,
	Product,
	Cart,
	Successorder,
} from './pages';
import {
	CategoryAdd,
	Categorys,
	ProductAdd,
	Products,
	ProductEdit,
	Orders,
	MainAdmin,
} from './pages/admin';
import { useEffect, useState } from 'react';
import { Users } from './pages/admin';
import { request } from './utils';
import { setUser } from './storeRtk/slice/user.ts';
import { addMessage } from './storeRtk/slice/message-reducer.ts';

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
	const dispatch = useAppDispatch();

	const message = useAppSelector((state) => state.errorMessage);

	useEffect(() => {
		request('/user').then(({ error, user }) => {
			if (error) {
				dispatch(addMessage({ id: Date.now(), message: error }));
				return;
			}

			dispatch(setUser(user));
		});
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
					<Route path="/product/:productId" element={<Product />} />
					<Route path="/category/:catId" element={<CategoryPage />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/acceptorder" element={<div>post id</div>} />
					<Route path="/successorder" element={<Successorder />} />
					<Route path="/admin" element={<Admin />}>
						<Route index element={<MainAdmin />} />
						<Route path="users" element={<Users />} />
						<Route path="users/edit/:id" element={<EditUser />} />
						<Route path="personal/edit/:id" element={<EditUser />} />
						<Route path="orders" element={<Orders />} />
						<Route path="categoryes" element={<Categorys />} />
						<Route path="category/edit/:id" element={<CategoryAdd />} />
						<Route path="category/add" element={<CategoryAdd />} />
						<Route path="products" element={<Products />} />
						<Route path="products/edit/:id" element={<ProductEdit />} />
						<Route path="products/add" element={<ProductAdd />} />
					</Route>
					<Route path="*" element={<div>Такой страницы не существует</div>} />
				</Routes>
			</Content>
			<Footer />
			<Modal />
			{message && <Tooltip messages={message} />}
		</App>
	);
};
