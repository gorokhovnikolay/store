export interface IProduct {
	id:string
	name: string
	description: string
	price: string
	image: string
	cat: ICategories[]
	comments: string[]
}

export interface ICategories{
	id:string
	name:string
	description: string
	color:string
}
