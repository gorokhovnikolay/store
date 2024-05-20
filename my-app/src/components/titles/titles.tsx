import {useState,useEffect} from 'react'
import styled from "styled-components"

interface TitlesContainerProps {
	className?: string,
	titles: string[]
	delay:number
}

const TitlesContainer:React.FC<TitlesContainerProps> = ({className,titles,delay}) =>{
	const [curentTitle, setCurentTitle] = useState(0)

	useEffect(()=>{
		let titleId = 0
		const timer = setInterval(()=>{
			if(titleId < titles.length-1){
				titleId ++
			} else {
				titleId = 0
			}
			setCurentTitle(titleId)
		},delay)
	return ()=>clearInterval(timer)
	},[titles.length,delay])

	return <div className={className}>
	<h1 className='main-baner-title'>{titles[curentTitle]}</h1>
	</div>
}

export const Titles = styled(TitlesContainer)`

	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 250px;
	background: #62bceb;
	border-radius: 25px;
	margin-bottom: 25px;

& .main-baner-title {
	color: white;
	font-size: 40px;
	font-weight: 900;
}
`
