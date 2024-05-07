import { request } from '../../utils';

export const asyncArrangeOrder = (products) => (dispatch) => {
	return request(`/order`, 'POST', { products }).then(({ error, order }) => {
		if (error) {
			console.log(error);
			return;
		}
		console.log(order);
		dispatch({
			type: 'CREATE_ORDER',
			payload: order,
		});
		console.log('Заказ создан');
	});
};
