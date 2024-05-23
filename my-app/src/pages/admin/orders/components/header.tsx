import styled from "styled-components"

interface HeaderOrdersAdminContainerProps {
	className?:string
	lastPage: number
	page: number
	limit: number
	setPage: (a:number)=>void
	setLimit: (a:string)=>void
}

const HeaderOrdersAdminContainer: React.FC<HeaderOrdersAdminContainerProps> = ({className,lastPage,page,limit,setPage, setLimit}) =>{

	const onChangeLimit = (e:React.ChangeEvent<HTMLSelectElement>)=>{
		setLimit(e.target.value)
		setPage(1)
	}

	return <div className={className}>
		<div className="header-orders">
					{lastPage !== 1 && (
						<div className="pagination">
							<button disabled={page === 1} onClick={() => setPage(1)}>
								{'<<'}
							</button>
							<button
								disabled={page === 1}
								onClick={() => setPage(page - 1)}
							>
								{'<'}
							</button>
							<button disabled={true}>{page}</button>
							<button
								disabled={page === lastPage}
								onClick={() => setPage(page + 1)}
							>
								{'>'}
							</button>
							<button
								disabled={page === lastPage}
								onClick={() => setPage(lastPage)}
							>
								{'>>'}
							</button>
						</div>
					)}
					<div className="limit-orders">
						<select
							defaultValue={limit}
							onChange={onChangeLimit}
						>
							<option value={8}>8</option>
							<option value={16}>16</option>
							<option value={32}>32</option>
							<option value={40}>40</option>
							<option value={48}>48</option>
						</select>
					</div>
				</div>
	</div>
}

export const HeaderOrdersAdmin = styled(HeaderOrdersAdminContainer)``
