import { IUser } from '@interfaces/user.interface'

interface Images {
  url: string
}

interface Location {
  lat: number
  lng: number
}

export interface IProduct {
  _id: string
  title: string
  description: string
  images: Images[]
  userId: string
  location: Location
  categories: string[]
  user?: IUser[]
}

export interface IProductPayload {
  title: string
  description: string
  images: Images[]
  userId: string
}

export interface IProductGetParams {
  id?: string
}
export interface IAllProductQuery {
  search?: string
  categories?: string
}
