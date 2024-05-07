import { useState, useEffect } from 'react';

export const useCategoryesList = (getRequest, id, isFlag) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorServer, setErrorServer] = useState('');

	useEffect(() => {
		setIsLoading(true);
		getRequest(id).then(({ res, error }) => {
			if (error) {
				setErrorServer(error);
				return;
			}
			setErrorServer('');
			setIsLoading(false);
			setData(res);
		});
	}, [getRequest, id, isFlag]);

	return { data, isLoading, errorServer };
};
