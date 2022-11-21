import { ObjectId } from 'mongoose'

export interface IProductRequest {
  _id: ObjectId
  description: string
  userId: ObjectId
  productId: ObjectId
  status: 'Pending' | 'Accepted' | 'Rejected'
}

export interface IProductRequestPayload {
  description: string
  userId: ObjectId
  status?: 'Pending' | 'Accepted' | 'Rejected'
  productId: ObjectId
}

export interface IProductRequestGetParams {
  id?: string
}
