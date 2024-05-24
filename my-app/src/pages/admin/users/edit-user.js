import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button, Input } from '../../../components';
import { request } from '../../../utils';
import { useAppDispatch } from '../../../storeRtk/hooks';
import { addMessage } from '../../../storeRtk/slice/message-reducer';

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const regShemaYup = yup.object().shape({
	login: yup
		.string()
		.required('Введите Логин')
		.matches(/^\w+$/, 'Логин должен содержать только буквы и цыфры')
		.min(3, 'Логин должен быть не более 3 символов')
		.max(20, 'Логин не должен быть более 20 символов'),
	email: yup.string().email('Email введен некорректно'),
	phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const EditUserContainer = ({ className }) => {
	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: async () => {
			const { user } = await request(`/api/admin/users/${id}`);
			const roleLabel = user.role === '0' ? 'Админ' : 'Пользаватель';
			return {
				login: user.login,
				email: user.email || '',
				phone: user.phone || '',
				role: { label: roleLabel, value: user.role } || {
					label: 'Пользаватель',
					value: '1',
				},
			};
		},
		resolver: yupResolver(regShemaYup),
	});
	const onSubmit = ({ password, email, login, phone, role }) => {
		const formatRole = (data) => {
			return data.value;
		};
		request(`/api/admin/users/${id}`, 'PATCH', {
			password,
			email,
			login,
			phone,
			role: formatRole(role),
		}).then(({ error, user }) => {
			if (error) {
				dispatch(addMessage({ id: Date.now(), message: error }));
				return;
			}
			navigate('/admin/users');
		});
	};

	const formErrors =
		errors?.login?.message || errors?.email?.message || errors?.phone?.message;

	useEffect(() => {
		if (formErrors) {
			dispatch(addMessage({ id: Date.now(), message: formErrors }));
		}
	}, [formErrors, dispatch]);

	return (
		<div className={className}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="login">
					<Input
						placeholder="Введите ваш логин"
						id="login"
						type="text"
						{...register('login')}
					/>
				</div>
				<div className="email">
					<Input
						placeholder="Введите ваш email"
						id="email"
						type="text"
						{...register('email')}
					/>
				</div>
				<div className="phone">
					<Input
						placeholder="Введите ваш телефон"
						id="phone"
						type="text"
						{...register('phone')}
					/>
				</div>
				<div className="role">
					<Controller
						control={control}
						name="role"
						render={({ field }) => (
							<Select
								{...field}
								defaultOptions
								classNamePrefix="react-custom"
								cacheOptions
								isMulti={false}
								options={[
									{ label: 'Админ', value: '0' },
									{ label: 'Пользаватель', value: '1' },
								]}
								theme={(theme) => {
									return {
										...theme,
										borderRadius: '25px',
									};
								}}
							/>
						)}
					/>
				</div>
				<div className="login-button">
					<Button
						width={'auto'}
						height={'50px'}
						background="white"
						color="black"
					>
						Изменить данные
					</Button>
				</div>
			</form>
		</div>
	);
};

export const EditUser = styled(EditUserContainer)`
	width: 500px;
	margin: 100px auto 0;
	padding: 10px;
	border: 1px solid #62bceb;
	border-radius: 25px;
	& .login-button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 25px;
	}
	& .edit-form-label {
		margin: 5px;
		color: white;
		font-size: 18px;
	}
`;
