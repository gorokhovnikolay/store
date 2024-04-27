import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button, Input } from '../../../components';
import { request } from '../../../utils';

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
	const [isLoading, setIsLoading] = useState(false);
	const [errorServer, setErrorServer] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: async () => {
			const { user } = await request(`/admin/users/${id}`);
			return {
				login: user.login,
				email: user.email || '',
				phone: user.phone || '',
			};
		},
		resolver: yupResolver(regShemaYup),
	});
	const onSubmit = ({ password, email, login, phone, role }) => {
		const formatRole = (data) => {
			return data.value;
		};
		request(`/admin/users/${id}`, 'PATCH', {
			password,
			email,
			login,
			phone,
			role: formatRole(role),
		}).then(({ error, user }) => {
			if (error) {
				setErrorServer(error);
				return;
			}
			console.log(user);
		});
	};
	return isLoading ? (
		<progress value={null} />
	) : (
		<div className={className}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{errorServer && <div>{errorServer}</div>}
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
								cacheOptions
								isMulti={false}
								options={[
									{ label: 'Админ', value: '0' },
									{ label: 'Пользаватель', value: '1' },
								]}
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
