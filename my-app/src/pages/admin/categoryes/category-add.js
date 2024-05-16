import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../../components';
import { request } from '../../../utils';
import { useAppDispatch } from '../../../storeRtk/hooks';
import { addMessage } from '../../../storeRtk/slice/message-reducer';

const addCarShema = yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
});

const CategoryAddContainer = ({ className }) => {
	const { id: catId } = useParams();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: !catId
			? {
					name: '',
					description: '',
			  }
			: async () => {
					const { category } = await request(`/admin/category/${catId}`);
					return {
						name: category.name,
						description: category.description,
						color: category.color,
					};
			  },
		resolver: yupResolver(addCarShema),
	});

	const onSubmit = ({ name, description, color }) => {
		!catId
			? request('/admin/category', 'POST', { name, description, color }).then(
					({ error, category }) => {
						if (error) {
							dispatch(addMessage({ id: Date.now(), message: error }));
							return;
						}
						console.log(category);
						reset();
					},
			  )
			: request(`/admin/category/${catId}`, 'PATCH', {
					name,
					description,
					color,
			  }).then(({ error, category }) => {
					if (error) {
						dispatch(addMessage({ id: Date.now(), message: error }));
						return;
					}
					console.log(category);
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
					<label htmlFor="color">Введите название категории:</label>
					<Input
						placeholder="Введите название категории"
						width="50px"
						id="color"
						type="color"
						{...register('color')}
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
					{catId ? 'Сохранить изменения' : 'Создать категорию'}
				</Button>
			</form>
		</div>
	);
};

export const CategoryAdd = styled(CategoryAddContainer)`
	& .form-input {
		display: flex;
		flex-direction: column;
	}
`;
