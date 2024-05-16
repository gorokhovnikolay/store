import styled from "styled-components"

interface ISuccessorderContainerProps {
	className?:string
}

const SuccessorderContainer:React.FC<ISuccessorderContainerProps> = ({className})=>{
	return <div className={className}>
		Заказ успешно создан! Менеджер свяжется с вами в ближайшее время и уточнит детали заказа!
	</div>
}


export const Successorder = styled(SuccessorderContainer)``
