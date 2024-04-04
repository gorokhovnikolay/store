export const BurgerMenu = ({ color = 'white' }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="25px"
			height="25px"
			viewBox="0 0 24 24"
			fill="none"
			style={{ marginRight: '5px' }}
		>
			<path d="M4 18L20 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
			<path d="M4 12L20 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
			<path d="M4 6L20 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
		</svg>
	);
};
