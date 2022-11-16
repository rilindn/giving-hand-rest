import mongoose, { Schema, Document, model, ObjectId } from 'mongoose'
import { IProduct } from '@interfaces/product.interface'

const ImageSchema = new Schema({
  url: { type: String },
})

const LocationSchema = new Schema({
  lng: { type: Number },
  lat: { type: Number },
  address: { type: String },
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
      type: mongoose.Types.ObjectId,
      index: true,
    },
    categories: {
      type: [String],
    },
    location: {
      type: LocationSchema,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  },
)

const Product = model<IProduct & Document>('Product', ProductSchema)

export default Product
