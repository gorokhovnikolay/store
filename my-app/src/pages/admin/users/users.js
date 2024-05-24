import { useEffect, useState } from 'react';
import { ContainerBlock, Tooltip } from '../../../components';
import { UserItem } from './components';

import styled from 'styled-components';
import { request } from '../../../utils';

const UsersContainer = ({ className }) => {
	const [data, setData] = useState([]);
	const [errorServer, setErrorServer] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [refresh, setRefresh] = useState(true);
	const [message, setMessage] = useState('');

	useEffect(() => {
		setIsLoading(true);
		request('/api/admin/users')
			.then(({ users, error }) => {
				if (error) {
					setIsLoading(false);
					setErrorServer(error);
					return;
				}
				setData(users);
			})
			.finally(() => setIsLoading(false));
	}, [refresh]);

	return (
		<ContainerBlock errorServer={errorServer} isLoading={isLoading}>
			<div className={className}>
				<div className="user-header">
					<h2>Клиенты</h2>
				</div>
				{data.map(({ id, login, role, createdAt, password, email, phone }) => {
					return (
						<UserItem
							key={id}
							id={id}
							role={role}
							login={login}
							createdAt={createdAt}
							password={password}
							setMessage={setMessage}
							email={email}
							phone={phone}
							setRefresh={setRefresh}
						/>
					);
				})}
			</div>
			<Tooltip message={message} />
		</ContainerBlock>
	);
};

export const Users = styled(UsersContainer)`
	& .user-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
