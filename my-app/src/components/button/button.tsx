import styled from 'styled-components';

interface ButtonContainerProps{
		[x: string]: any;
		className: string;
		children: React.ReactNode;
}

const ButtonContainer:React.FC<ButtonContainerProps> = ({ className, children, ...props }) => {
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
	background: ${({ background = '#62bceb' }) => background};
	color: ${({ color = 'white' }) => color};
	border: 1px solid #62bceb;
	padding: ${({ padding = '5px 15px' }) => padding};
	cursor: pointer;
	height: ${({ height = '100%' }) => height};
	width: ${({ width = '100%' }) => width};
	position: ${({ position = 'relative' }) => position};
	top: ${({ top = '0px' }) => top};
	right: ${({ right = '0px' }) => right};
	& img {
		margin-right: 5px;
	}
`;
