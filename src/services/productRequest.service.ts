import mongoose from 'mongoose'
import _ from 'lodash'

import HttpException from '@utils/HttpException'
import ProductRequest from '@models/productRequest.model'
import {
  IProductRequest,
  IProductRequestPayload,
} from '@interfaces/productRequest.interface'

async function getProductRequests() {
  try {
    const productRequests = await ProductRequest.find().sort({
      createdAt: 'descending',
    })
    return productRequests
  } catch (error) {
    throw new HttpException(error)
  }
}

async function getProductRequestById(id: string) {
  try {
    const productRequest: IProductRequest[] = await ProductRequest.aggregate([
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
    if (!productRequest) {
      throw new HttpException('ProductRequest not found', 404)
    }
    return _.first(productRequest)
  } catch (error) {
    throw new HttpException(error)
  }
}

async function createProductRequest(payload: IProductRequestPayload) {
  try {
    const productRequest = new ProductRequest({ ...payload })
    await productRequest.save()

    return productRequest
  } catch (error) {
    throw new HttpException(error)
  }
}

async function updateProductRequest(
  id: string,
  payload: IProductRequestPayload,
) {
  const productRequestId = id.toString()
  try {
    const productRequest = await ProductRequest.findByIdAndUpdate(
      productRequestId,
      payload,
      {
        returnOriginal: false,
      },
    )
    if (!productRequest) {
      throw new HttpException('ProductRequest not found', 404)
    }
    return productRequest
  } catch (error) {
    throw new HttpException(error)
  }
}

async function deleteProductRequest(id: string) {
  try {
    const productRequest = await ProductRequest.findByIdAndDelete(id)
    if (!productRequest) {
      throw new HttpException('ProductRequest not found', 404)
    }
    return productRequest
  } catch (error) {
    throw new HttpException(error)
  }
}

export default {
  getProductRequests,
  getProductRequestById,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
}
