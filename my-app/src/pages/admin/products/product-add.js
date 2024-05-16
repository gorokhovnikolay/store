import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import * as yup from 'yup';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../../components';
import { request } from '../../../utils';
import { useAppDispatch } from '../../../storeRtk/hooks';
import { addMessage } from '../../../storeRtk/slice/message-reducer';

const addCarShema = yup.object().shape({
	name: yup.string().required(),
	image: yup.string().required(),
	price: yup.number().required(),
	description: yup.string(),
});

const CategoryAddContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({
		defaultValues: {
			name: '',
			price: null,
			description: '',
			image: '',
		},
		resolver: yupResolver(addCarShema),
	});
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const onSubmit = (product) => {
		request('/admin/product', 'POST', product).then(({ error, product }) => {
			if (error) {
				dispatch(addMessage({ id: Date.now(), message: error }));
				return;
			}
			// console.log(product);
		});
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
						name="cat"
						render={({ field }) => (
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
						)}
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
				<Button width={'auto'} height={'50px'} background="white" color="black">
					Создать новый товар
				</Button>
			</form>
		</div>
	);
};

export const ProductAdd = styled(CategoryAddContainer)`
	& .form-input {
		display: flex;
		flex-direction: column;
	}
`;
