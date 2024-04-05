import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button, Input } from '../../components';
import { Link } from 'react-router-dom';
import { fetchRegister } from '../../api/fetch-register';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const regShemaYup = yup.object().shape({
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
		},
		resolver: yupResolver(regShemaYup),
	});

	const onSubmit = ({ login, password }) => {
		setIsLoading(true);
		fetchRegister({ login, password }).then(({ error, res }) => {
			if (error) {
				setServerError(error);
				return;
			}
			setServerError('');
			dispatch({ type: 'LOGIN_USER', payload: res });
			navigate('/');
			setIsLoading(false);
		});
		reset();
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const error = serverError || formError;

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
