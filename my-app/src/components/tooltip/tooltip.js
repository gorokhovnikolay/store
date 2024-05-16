import styled from 'styled-components';
import { useAppDispatch } from '../../storeRtk/hooks';
import { deleteMessage } from '../../storeRtk/slice/message-reducer';

const TooltipContainer = ({ messages, className }) => {
	const dispatch = useAppDispatch();

	return (
		<div className={className}>
			{messages.map(({ id = '0', message }) => {
				return (
					<div key={id} className="tool-tip">
						{id}:{message}
						<button onClick={() => dispatch(deleteMessage(id))}>x</button>
					</div>
				);
			})}
		</div>
	);
};

export const Tooltip = styled(TooltipContainer)`
	display: flex;
	position: fixed;
	top: 10px;
	right: 10px;
	flex-direction: column;
	& .tool-tip {
		display: block;
		background: #ff0000c2;
		min-width: 300px;
		min-height: 50px;
		padding: 10px;
		margin-bottom: 5px;
	}
`;
