import { forwardRef } from 'react';
import styled from 'styled-components';

export const InputContainer = forwardRef(
	({ children, className, onChange, label, ...props }, ref) => {
		return (
			<div className={className}>
				{label && <label>{label}</label>}
				<input onChange={onChange} {...props} ref={ref} />
				{children}
			</div>
		);
	},
);

export const Input = styled(InputContainer)`
	display: flex;
	align-items: center;
	height: 50px;
	border: 1px solid #62bceb;
	border-radius: 25px;
	margin-bottom: 5px;
	background: white;
	width: ${({ width = 'auto' }) => `calc(${width} + 50px)`};
	input {
		width: ${({ width = 'calc(100% - 36px)' }) => width};
		height: 100%;
		outline: none;
		border: none;
		font-size: ${({ fontSize = '16px' }) => fontSize};
		margin: 0 25px;
	}
`;
