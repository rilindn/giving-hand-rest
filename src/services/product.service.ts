import HttpException from '@utils/HttpException'
import Product from '@models/product.model'
import { IProduct, IProductPayload } from '@interfaces/product.interface'
import mongoose from 'mongoose'
import _ from 'lodash'

async function getProducts() {
  try {
    const products = await Product.find().sort({ createdAt: 'descending' })
    return products
  } catch (error) {
    throw new HttpException(error)
  }
}

async function getProductById(id: string) {
  try {
    const product: IProduct[] = await Product.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
    ])
    if (!product) throw new HttpException('Product not found', 404)
    return _.first(product)
  } catch (error) {
    throw new HttpException(error)
  }
}

async function createProduct(payload: IProductPayload) {
  try {
    const product = new Product({ ...payload })
    await product.save()

    return product
  } catch (error) {
    throw new HttpException(error)
  }
}

async function updateProduct(id: string, payload: IProductPayload) {
  const productId = id.toString()
  try {
    const product = await Product.findByIdAndUpdate(productId, payload, {
      returnOriginal: false,
    })
    if (!product) throw new HttpException('Product not found', 404)
    return product
  } catch (error) {
    throw new HttpException(error)
  }
}

async function deleteProduct(id: string) {
  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product) throw new HttpException('Product not found', 404)
    return product
  } catch (error) {
    throw new HttpException(error)
  }
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
