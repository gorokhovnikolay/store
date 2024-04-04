import styled from 'styled-components';

export const InputContainer = ({ children, className, onChange, ...props }) => {
	return (
		<div className={className}>
			<input
				name="search"
				type="text"
				id="search"
				placeholder="Поиск по наименованию"
				onChange={onChange}
				{...props}
			/>
			{children}
		</div>
	);
};

export const Input = styled(InputContainer)`
	display: flex;
	align-items: center;
	height: 100%;
	input#search {
		width: calc(100% - 36px);
		height: 100%;
		outline: none;
		border: none;
		margin-left: 25px;
		font-size: ${({ fontSize = '16px' }) => fontSize};
	}
`;
