import { request } from '../../utils';

export const asyncAddProductToCart =
	({ product }) =>
	(dispatch) => {
		return request('/cart', 'PATCH', { product }).then(({ error, cartProduct }) => {
			if (error) {
				return { message: error };
			}
			dispatch({
				type: 'ADD_TO_CART',
				payload: { product: cartProduct },
			});
			return { message: 'Товар добавлен в корзину' };
		});
	};
