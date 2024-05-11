
import styled from 'styled-components';

interface IBlockContainer {
	className?:string,
	errorServer?:string,
	isLoading?:boolean,
	children?:React.ReactNode
}

const BlockContainer:React.FC<IBlockContainer> = ({ className, errorServer, isLoading, children }) => {
	if (errorServer) {
		return <div>{errorServer}</div>;
	}

	return isLoading ? (
		<div className={className}>
			<progress value={undefined} />
		</div>
	) : (
		<div> {children}</div>
	);
};

export const ContainerBlock = styled(BlockContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
`;


