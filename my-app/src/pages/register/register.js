import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button, Input } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request } from '../../utils';

const regShemaYup = yup.object().shape({
	login: yup
		.string()
		.required('Введите Логин')
		.matches(/^\w+$/, 'Логин должен содержать только буквы и цыфры')
		.min(3, 'Логин должен быть не более 3 символов')
		.max(20, 'Логин не должен быть более 20 символов'),
	email: yup.string().email().required('Не ввели email'),
	phone: yup.string().required('Не ввели телефон'),
	password: yup
		.string()
		.required('Введите Пароль')
		.matches(/^[\w%#]+$/, 'Пароль должен содержать только буквы, цыфры, # и %')
		.min(6, 'Пароль должен быть не более 6 символов')
		.max(40, 'Пароль не должен быть более 40 символов'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegisterContainer = ({ className }) => {
	const [serverError, setServerError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
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
			email: '',
			phone: '',
		},
		resolver: yupResolver(regShemaYup),
	});

	const onSubmit = ({ login, password, email, phone }) => {
		setIsLoading(true);
		request('/register', 'POST', { login, password, email, phone }).then(
			({ error, user }) => {
				if (error) {
					setIsLoading(false);
					setServerError(error);
					return;
				}
				setServerError('');
				dispatch({ type: 'LOGIN_USER', payload: user });
				navigate('/');
				setIsLoading(false);
			},
		);
		reset();
	};
	const passError = errors?.password?.message || errors?.confirmPassword?.message;
	const formError = errors?.login?.message || passError;
	const emailerror = formError || errors?.email?.message;
	const error = serverError || emailerror;

	return isLoading ? (
		<progress value={null} />
	) : (
		<div className={className}>
			<h2>Вход</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				{error && <div>{error}</div>}
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
				<div className="password">
					<Input
						placeholder="Введите ваш пароль"
						type="password"
						id="password"
						{...register('password')}
					/>
				</div>
				<div className="confirm-password">
					<Input
						placeholder="Повторите пароль"
						type="password"
						id="confirmPassword"
						{...register('confirmPassword')}
					/>
				</div>
				<div className="login-button">
					<Button width={'auto'} height={'50px'}>
						Зарегистрироваться
					</Button>
					<Link to="/login">Уже есть аккаунт?</Link>
				</div>
			</form>
		</div>
	);
};

export const Register = styled(RegisterContainer)`
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
