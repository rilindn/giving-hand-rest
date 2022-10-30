import { Schema, Document, model } from 'mongoose'
import { IProduct } from '@interfaces/product.interface'

const ImageSchema = new Schema({
  url: { type: String },
})

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [ImageSchema],
    },
    userId: {
      type: String,
    },
    categories: {
      type: [String],
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  },
)

const Product = model<IProduct & Document>('Product', ProductSchema)

export default Product
