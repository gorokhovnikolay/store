import styled from 'styled-components';

const FooterContainer:React.FC<{className:string}> = ({ className }) => {
	return <div className={className}>FooterContainer</div>;
};

export const Footer = styled(FooterContainer)`
	margin: auto 0 0;
	min-height: 100px;
	background: #62bceb;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 25px;
`;
