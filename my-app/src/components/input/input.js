import { forwardRef } from 'react';
import styled from 'styled-components';

export const InputContainer = forwardRef(
	({ children, className, onChange, ...props }, ref) => {
		return (
			<div className={className}>
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
	input {
		width: calc(100% - 36px);
		height: 100%;
		outline: none;
		border: none;
		font-size: ${({ fontSize = '16px' }) => fontSize};
		margin: 0 25px;
	}
`;
