import HttpException from '@utils/HttpException'
import Product from '@models/product.model'
import {
  IAllProductQuery,
  IProduct,
  IProductPayload,
} from '@interfaces/product.interface'
import mongoose from 'mongoose'
import _ from 'lodash'
import ProductRequestService from '@services/productRequest.service'

async function getProducts({
  search,
  categories,
  limit,
  offset,
}: IAllProductQuery) {
  const categoriesArr = categories ? categories.split(',') : []
  const searchQuery = search && [
    { title: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
  ]
  const categoriesQuery = !!categoriesArr?.length && [
    {
      categories: { $in: categoriesArr },
    },
  ]

  try {
    const products = await Product.aggregate([
      {
        $match: {
          ...((searchQuery || categoriesQuery) && {
            $or: [...(searchQuery || []), ...(categoriesQuery || [])],
          }),
        },
      },
      {
        $lookup: {
          from: 'productRequests',
          localField: '_id',
          foreignField: 'productId',
          as: 'requests',
        },
      },
      { $limit: +limit + +offset },
      { $skip: +offset },
    ]).sort({ createdAt: 'descending' })
    return products
  } catch (error) {
    throw new HttpException(error)
  }
}

async function getMyProducts(id: string) {
  try {
    const products: IProduct[] = await Product.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'productRequests',
          localField: '_id',
          foreignField: 'productId',
          as: 'requests',
        },
      },
    ]).sort({ createdAt: 'descending' })
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
      {
        $lookup: {
          from: 'productRequests',
          let: { id: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$productId', '$$id'] } } },
            {
              $lookup: {
                from: 'users',
                let: { userId: '$userId' },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ['$_id', '$$userId'] } },
                  },
                ],
                as: 'requester',
              },
            },
            {
              $unwind: '$requester',
            },
          ],
          as: 'requests',
        },
      },
      {
        $project: {
          'user.password': 0,
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
    const productRequests = await ProductRequestService.deleteProductRequests(
      id,
    )
    return product
  } catch (error) {
    throw new HttpException(error)
  }
}

export default {
  getProducts,
  getMyProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
