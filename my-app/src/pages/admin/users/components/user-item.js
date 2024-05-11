import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../components';
import { EditIcon, RemoveIcon } from '../../../../assets/svg';
import { Link } from 'react-router-dom';
import { request } from '../../../../utils';
import { useAppDispatch } from '../../../../storeRtk/hooks.ts';
import { closeModal, visibleModal } from '../../../../storeRtk/slice/modal.ts';

const UserItemContainer = ({
	className,
	id,
	role,
	login,
	createdAt,
	setMessage,
	email,
	phone,
	setRefresh,
}) => {
	const dispatch = useAppDispatch();
	const deleteUser = (id) => {
		dispatch(
			visibleModal({
				modal: true,
				confirm: () => {
					dispatch(closeModal());
					request(`/admin/users/${id}`, 'DELETE').then(({ message, error }) => {
						if (error) {
							setMessage(error);
							return;
						}
						setRefresh((prev) => !prev);
						setMessage(message);
					});
				},
				cancel: () => dispatch(closeModal()),
			}),
		);
	};
	return (
		<div className={className}>
			<div className="user-info">
				<div className="user-login">
					<span
						style={{ color: role === '0' ? 'red' : '' }}
						title={role === '0' ? 'Сотрудник' : 'Пользаватель'}
					>
						{login}
					</span>
				</div>
				<div className="user-email">{email}</div>
				<div className="user-email">{phone}</div>
				<div className="user-reg">{createdAt}</div>
			</div>
			<div className="user-control">
				<Link to={`/admin/users/edit/${id}`}>
					<Button width="35px" height="35px" background="white" padding="0px">
						<EditIcon size="20px" color="green" />
					</Button>
				</Link>
				{role === '0' ? null : (
					<Button
						width="35px"
						height="35px"
						background="white"
						padding="0px"
						onClick={() => deleteUser(id)}
					>
						<RemoveIcon size="20px" color="red" />
					</Button>
				)}
			</div>
		</div>
	);
};

export const UserItem = styled(UserItemContainer)`
	display: flex;
	justify-content: space-between;
	padding: 10px 5px;
	margin: 5px 0;
	border: 1px solid #858585;
	background: white;
	border-radius: 12px;
	align-items: center;
	& div {
		text-align: start;
	}
	& .user-info {
		display: flex;
		width: 80%;
	}
	& .user-control {
		display: flex;
	}
	& .user-login {
		width: 200px;
		word-break: break-word;
	}
	& .user-email {
		min-width: 200px;
	}
`;
