
const request = (url:string, method?:string, data?:any):Promise<any> => {
	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : null,
	}).then((res) => res.json());
};

export {request}
