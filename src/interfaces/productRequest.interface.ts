import { ObjectId } from 'mongoose'

export interface IProductRequest {
  _id: ObjectId
  description: string
  userId: ObjectId
  productId: ObjectId
  status: string
}

export interface IProductRequestPayload {
  description: string
  userId: ObjectId
  status: string
  productId: ObjectId
}

export interface IProductRequestGetParams {
  id?: string
}
