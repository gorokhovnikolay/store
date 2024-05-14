import {IIcon} from './types'

export const CategoriesIcon:React.FC<IIcon> = ({ color = 'white', size = '36px' }) => (
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
	<path d="M5 12H18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
	<path d="M5 17H11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
	<path d="M5 7H15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
</svg>
);




