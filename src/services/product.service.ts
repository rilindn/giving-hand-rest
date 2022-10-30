import HttpException from '@utils/HttpException'
import Product from '@models/product.model'
import { IProductPayload } from '@interfaces/product.interface'

async function getProducts() {
  try {
    const products = await Product.find()
    return products
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
  createProduct,
  updateProduct,
  deleteProduct,
}
