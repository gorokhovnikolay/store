import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/button/button'

interface PaginationsProps {
	className?:string
	setPage:(page:number)=>any | void
	page:number
	lastPage:number
}

const PaginationContainer:React.FC<PaginationsProps> = ({className,setPage,page,lastPage}) => {
	return (
	  <div className={className}>
		<Button disabled={page === 1} width='50px' height='50px' onClick={()=>setPage(1)}>{'<<'}</Button>
		<Button disabled={page === 1} width='50px' height='50px' onClick={()=>setPage(page - 1)}>{'<'}</Button>
		<Button disabled={true} width='50px' height='50px' color="black">{page}</Button>
		<Button disabled={page === lastPage} width='50px' height='50px' onClick={()=>setPage(page + 1)}>{'>'}</Button>
		<Button disabled={page === lastPage} width='50px' height='50px' onClick={()=>setPage(lastPage)}>{'>>'}</Button>
	  </div>
	)
}
export const Paginations = styled(PaginationContainer)`
	display: flex;
    justify-content: center;
    align-items: center;
`


