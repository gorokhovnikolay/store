import { request } from '../../utils';

export const asyncDeleteProduct = (id) => (dispatch) => {
	return request(`/cart/delete/${id}`, 'PATCH', { id }).then(
		({ error, cartProducts }) => {
			if (error) {
				console.log(error);
				return;
			}
			dispatch({
				type: 'DELETE_PRODUCT_WITH_CART',
				payload: { product: cartProducts },
			});
			console.log('Позиция удалена');
		},
	);
};
