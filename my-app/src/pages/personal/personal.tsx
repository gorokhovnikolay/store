import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../storeRtk/hooks"
import { useEffect, useState } from "react"
import { request } from "../../utils/request"
import { addMessage } from "../../storeRtk/slice/message-reducer"
import { IProduct } from "../../types/types"
import { Link } from "react-router-dom"

interface PersonalProps{
	className?:string
}

interface Order {
	product: IProduct[]
	createdAt?: string
	id:string
}

const PersonalContainer:React.FC<PersonalProps>=({className})=>{
	const dispatch = useAppDispatch()
	const [orders,setOrders] = useState([])

	useEffect(()=>{
		request('/user/orders').then(({error,orders})=>{
			if(error){
				dispatch(addMessage({id: Date.now(),message:error}))
				return
			}
			setOrders(orders)

		})
	},[dispatch])

	const user = useAppSelector(state=>state.user)


	return <div className={className}>
		<div className="personal-info">{user.login}</div>
		<div className="personal-orders">
			<h3>Мои заказы:</h3>
			<div className="personal-order">
				{orders.map((order:Order)=>{
					return <div className="order-item" key={order.id}>
						<h3>Дата заказа: {order.createdAt}</h3>
						{
							order?.product?.map((product:IProduct)=>{
								return <div key={product.id}>
									<Link to={`/product/${product.id}`}>
								{product.name}
								</Link></div>
							})
						}
					</div>
				})}
			</div>
		</div>
	</div>
}

export const Personal = styled(PersonalContainer)`
.personal-order {
    text-align: left;
}
.order-item {
    border: 1px solid gray;
    margin-bottom: 5px;
    border-radius: 25px;
    padding: 1px 25px 15px;
}
`
