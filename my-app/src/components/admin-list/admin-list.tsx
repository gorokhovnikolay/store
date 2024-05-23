
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
			<span className="loader"></span>
		</div>
	) : (
		<div> {children}</div>
	);
};

export const ContainerBlock = styled(BlockContainer)`
	display: flex;
	align-items: center;
	justify-content: center;

	.loader, .loader:before, .loader:after {
		border-radius: 50%;
		width: 2.5em;
		height: 2.5em;
		animation-fill-mode: both;
		animation: bblFadInOut 1.8s infinite ease-in-out;
	  }
	  .loader {
		color: black;
		font-size: 7px;
		position: relative;
		text-indent: -9999em;
		transform: translateZ(0);
		animation-delay: -0.16s;
	  }
	  .loader:before,
	  .loader:after {
		content: '';
		position: absolute;
		top: 0;
	  }
	  .loader:before {
		left: -3.5em;
		animation-delay: -0.32s;
	  }
	  .loader:after {
		left: 3.5em;
	  }

	  @keyframes bblFadInOut {
		0%, 80%, 100% { box-shadow: 0 2.5em 0 -1.3em }
		40% { box-shadow: 0 2.5em 0 0 }
	  }

`;


