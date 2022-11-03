import { ObjectId } from 'mongoose'

export interface IProductRequest {
  _id: ObjectId
  description: string
  userId: ObjectId
  productId: ObjectId
}

export interface IProductRequestPayload {
  description: string
  userId: ObjectId
  productId: ObjectId
}

export interface IProductRequestGetParams {
  id?: string
}
