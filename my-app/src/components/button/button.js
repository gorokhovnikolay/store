import styled from 'styled-components';

const ButtonContainer = ({ className, children, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	border-radius: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 600;
	background: #62bceb;
	color: white;
	border: 1px solid #62bceb;
	padding: ${({ padding = '5px 15px' }) => padding};
	cursor: pointer;
	height: ${({ height = '100%' }) => height};
	width: ${({ width = '100%' }) => width};
	& img {
		margin-right: 5px;
	}
`;
