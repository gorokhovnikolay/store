import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button } from '../button/button';

const ModalContainer = ({ className }) => {
	const { modal, confirm, cancel } = useSelector(({ modal }) => modal);
	const message = 'Удалить пользавателя?';
	return (
		modal && (
			<div className={className}>
				<div className="modal-container">
					<p className="modal-message">{message}</p>
					<div className="modal-btn">
						<Button width="auto" onClick={confirm}>
							Да
						</Button>
						<Button width="auto" onClick={cancel}>
							Нет
						</Button>
					</div>
				</div>
			</div>
		)
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: #000000b3;
	& .modal-container {
		position: absolute;
		background: white;
		width: ${({ width = '350px' }) => width};
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: ${({ height = '200px' }) => height};
		border-radius: 25px;
		padding: 25px;
		box-shadow: 0px 0px 17px 0px #000000d1;
	}
	& .modal-btn {
		display: flex;
		justify-content: space-around;
	}
	& .modal-message {
		text-align: center;
		font-size: 20px;
	}
`;
