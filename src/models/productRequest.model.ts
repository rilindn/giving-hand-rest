import mongoose, { Schema, Document, model } from 'mongoose'
import { IProductRequest } from '@interfaces/productRequest.interface'

const ProductRequestSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'productRequests',
  },
)

const ProductRequest = model<IProductRequest & Document>(
  'ProductRequest',
  ProductRequestSchema,
)

export default ProductRequest
