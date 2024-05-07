import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import * as yup from 'yup';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ContainerBlock, Input } from '../../../components';
import { request } from '../../../utils';

const addCarShema = yup.object().shape({
	name: yup.string().required(),
	image: yup.string().required(),
	price: yup.number().required(),
	description: yup.string(),
});

const ProductEditContainer = ({ className }) => {
	const { id } = useParams();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({
		defaultValues: async () => {
			const { product } = await request(`/admin/product/${id}`);
			return {
				name: product.name,
				description: product.description,
				color: product.color,
				price: product.price,
				image: product.image,
				category: product.cat.map((row) => {
					return {
						label: row.name,
						value: row.id,
						data: row.color,
					};
				}),
			};
		},
		resolver: yupResolver(addCarShema),
	});
	const navigate = useNavigate();

	const onSubmit = (product) => {
		const formatProduct = (data) => {
			return {
				name: data.name,
				image: data.image,
				description: data.description,
				price: data.price,
				comments: data.comments,
				cat: data.category.map((category) => category.value),
			};
		};
		request(`/admin/product/${id}`, 'PATCH', formatProduct(product)).then(
			({ error, product }) => {
				if (error) {
					console.log(error);
					return;
				}
				console.log(product);
			},
		);
		navigate(-1);
		reset();
	};
	const loadOptions = async (inputValue, callback) => {
		request('/admin/category').then(({ category }) => {
			const options = category.map((row) => ({
				label: row.name,
				value: row.id,
				data: row.color,
			}));
			callback(options);
		});
	};

	return (
		<ContainerBlock>
			<div className={className}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-input">
						<label htmlFor="name">Введите название категории:</label>
						<Input
							placeholder="Введите название категории"
							id="name"
							type="text"
							{...register('name')}
						/>
					</div>
					<div className="form-input">
						<label htmlFor="price">Введите название категории:</label>
						<Input
							placeholder="Введите стоимость"
							id="price"
							type="number"
							{...register('price')}
						/>
					</div>
					<div className="form-input">
						<label htmlFor="category">Выберите название категории:</label>

						<Controller
							control={control}
							name="category"
							render={({ field }) => {
								console.log(field);
								return (
									<AsyncSelect
										{...field}
										classNamePrefix="react-custom"
										isMulti={true}
										cacheOptions
										defaultOptions
										closeMenuOnSelect={false}
										loadOptions={loadOptions}
										theme={(theme) => {
											return {
												...theme,
												borderRadius: '25px',
											};
										}}
									/>
								);
							}}
						/>
					</div>
					<div className="form-input">
						<label htmlFor="image">Введите URL изображения:</label>
						<Input
							placeholder="Введите URL"
							id="image"
							type="text"
							{...register('image')}
						/>
					</div>
					<div className="form-input">
						<label htmlFor="description">Введите описание категории:</label>
						<textarea
							style={{
								fontSize: '18px',
								width: '100%',
								height: '214px',
								borderRadius: '25px',
								padding: '25px',
							}}
							placeholder="Введите описание категории"
							id="description"
							type="text"
							{...register('description')}
						/>
					</div>
					<Button
						width={'auto'}
						height={'50px'}
						background="white"
						color="black"
					>
						Сохранить изменения
					</Button>
				</form>
			</div>
		</ContainerBlock>
	);
};

export const ProductEdit = styled(ProductEditContainer)`
	& .form-input {
		display: flex;
		flex-direction: column;
	}
	& .react-custom__control {
		height: 50px;
		padding: 0 25px;
	}
	& .react-custom__menu {
		margin-top: 0px;
		padding: 0 25px;
	}
	& .react-custom__option {
		background: white;
		border-radius: 12px;
	}
	& .react-custom__option:hover {
		background: #62bceb;
		color: white;
	}
`;
