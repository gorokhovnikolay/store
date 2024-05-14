import React from 'react'
import styled from 'styled-components'

interface PaginationsProps {
	className?:string
	setPage:(page:number)=>any | void
	page:number
	lastPage:number
}

const PaginationContainer:React.FC<PaginationsProps> = ({className,setPage,page,lastPage}) => {
	return (
	  <div className={className}>
		<button disabled={page === 1} onClick={()=>setPage(1)}>В начало</button>
		<button disabled={page === 1} onClick={()=>setPage(page - 1)}>Назад</button>
		<button disabled={true}>{page}</button>
		<button disabled={page === lastPage} onClick={()=>setPage(page + 1)}>Вперед</button>
		<button disabled={page === lastPage} onClick={()=>setPage(lastPage)}>В конец</button>
	  </div>
	)
}
export const Paginations = styled(PaginationContainer)`
`


