import styled from 'styled-components';

const ModalContainer = ({ children, className }) => {
	return (
		<div className={className}>
			<div className="modal-container">{children}</div>
		</div>
	);
};

export const ModalCatalog = styled(ModalContainer)`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: #000000b3;
	z-index: 9;
	@media (max-width: 1190px) {
		& .modal-container {
			left: 10px !important;
		}
	}
	& .modal-container {
		position: absolute;
		background: white;
		width: ${({ width = '300px' }) => width};
		top: ${({ top = '150px' }) => top};
		left: ${({ left = 'calc((100% - 1200px) / 2)' }) => left};
		height: ${({ height = '50vh' }) => height};
		border-radius: 25px;
		padding: 25px;
		box-shadow: 0px 0px 17px 0px #000000d1;
		animation: isModal 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}

	@-webkit-keyframes isModal {
		from {
			left: -300px;
		}
		to {
			left: calc((100% - 1200px) / 2);
		}
	}
`;
