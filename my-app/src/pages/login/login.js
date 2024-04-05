import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Button, Input } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchLogin } from '../../api/fetch-login';

const loginShemaYup = yup.object().shape({
	login: yup
		.string()
		.required('Введите Логин')
		.matches(/^\w+$/, 'Логин должен содержать только буквы и цыфры')
		.min(3, 'Логин должен быть не более 3 символов')
		.max(20, 'Логин не должен быть более 20 символов'),
	password: yup
		.string()
		.required('Введите Пароль')
		.matches(/^[\w%#]+$/, 'Пароль должен содержать только буквы, цыфры, # и %')
		.min(6, 'Пароль должен быть не более 6 символов')
		.max(40, 'Пароль не должен быть более 40 символов'),
});

const LoginContainer = ({ className }) => {
	const [serverErorr, setServerError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(loginShemaYup),
	});

	const onSubmit = ({ login, password }) => {
		reset();
		fetchLogin({ login, password }).then(({ error, res }) => {
			if (error) {
				setServerError(error);
				return;
			}
			setServerError('');
			dispatch({ type: 'LOGIN_USER', payload: res });
			navigate('/');
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const error = serverErorr || formError;

	return (
		<div className={className}>
			<h2>Вход</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>{error}</div>
				<div className="login">
					<Input
						placeholder="Введите ваш логин"
						type="text"
						id="login"
						{...register('login')}
					/>
				</div>
				<div className="password">
					<Input
						placeholder="Введите ваш пароль"
						type="password"
						id="password"
						{...register('password')}
					/>
				</div>
				<div className="login-button">
					<Button width={'auto'} height={'50px'}>
						Авторизоваться
					</Button>
					<Link to="/register">Нет аккаунта?</Link>
				</div>
			</form>
		</div>
	);
};

export const Login = styled(LoginContainer)`
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
`;
