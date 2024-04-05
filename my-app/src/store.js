import { Outlet, Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header, Footer } from './components';
import { CategoryPage } from './pages';

const Content = styled.div`
	text-align: center;
	padding: 10px 25px;
`;
const App = styled.div`
	display: flex;
	flex-direction: column;
	height: auto;
	min-height: 100%;
	max-width: 1200px;
	margin: 0 auto;
	background: #fff;
	border-top: 2px solid #62bceb;
`;

export const Store = () => {
	return (
		<App>
			<Header />
			<Content>
				<Routes>
					<Route path="/login" element={<div>login</div>} />
					<Route path="/register" element={<div>register</div>} />
					<Route path="/" element={<div>Main</div>} />
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
					<Route
						path="/admin"
						element={
							<div>
								admin <Outlet />
							</div>
						}
					>
						<Route path="main" element={<div>admin main</div>} />
						<Route path="users" element={<div>admin users</div>} />
						<Route path="orders" element={<div>admin orders</div>} />
					</Route>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</App>
	);
};
