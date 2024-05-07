import styled from 'styled-components';

const AdminListContainer = ({ className, errorServer, isLoading, children }) => {
	if (errorServer) {
		return <div>{errorServer}</div>;
	}

	return isLoading ? (
		<div className={className}>
			<progress value={null} />
		</div>
	) : (
		<div> {children}</div>
	);
};

export const ContainerBlock = styled(AdminListContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
`;
