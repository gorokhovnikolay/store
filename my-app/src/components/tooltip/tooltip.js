import styled from 'styled-components';

const TooltipContainer = ({ message, className }) => {
	return message && <div className={className}>{message}</div>;
};

export const Tooltip = styled(TooltipContainer)`
	opacity: 0;
	display: block;
	position: fixed;
	top: 50px;
	right: 50px;
	background: #ff0000c2;
	min-width: 300px;
	min-height: 50px;
	padding: 10px;
	animation: visible 3000ms cubic-bezier(0.68, -0.55, 0.27, 1.55);

	@-webkit-keyframes visible {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
`;
