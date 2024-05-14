import {IIcon} from './types'

export const OrdersIcon:React.FC<IIcon> = ({ color = 'white', size = '36px' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
		<rect x="5" y="4" width="14" height="17" rx="2" stroke="#222222" strokeWidth="1.5"/>
		<path d="M9 9H15" stroke={color} strokeLinecap="round" strokeWidth="1.5"/>
		<path d="M9 13H15" stroke={color} strokeLinecap="round" strokeWidth="1.5"/>
		<path d="M9 17H13" stroke={color} strokeLinecap="round" strokeWidth="1.5"/>
	</svg>
);


