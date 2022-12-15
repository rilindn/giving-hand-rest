import mongoose from 'mongoose'
import _ from 'lodash'

import HttpException from '@utils/HttpException'
import ProductRequest from '@models/productRequest.model'
import NotificationService from '@services/notification.service'
import ProductService from '@services/product.service'
import {
  IProductRequest,
  IProductRequestPayload,
} from '@interfaces/productRequest.interface'
import { INotificationPayload } from '@/interfaces/notification.interface'

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
      {
        $unwind: '$user',
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

async function getMyRequests(id: string) {
  try {
    const products: IProductRequest[] = await ProductRequest.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'products',
          let: { id: '$productId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            {
              $lookup: {
                from: 'users',
                let: { userId: '$userId' },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ['$_id', '$$userId'] } },
                  },
                ],
                as: 'user',
              },
            },
            {
              $unwind: '$user',
            },
          ],
          as: 'product',
        },
      },
      {
        $unwind: '$product',
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
        $unwind: '$user',
      },
    ]).sort({ createdAt: 'descending' })
    return products
  } catch (error) {
    throw new HttpException(error)
  }
}

async function createProductRequest(payload: IProductRequestPayload) {
  try {
    const productRequest = new ProductRequest({ ...payload })
    await productRequest.save()

    if (productRequest) {
      const productId = productRequest.productId.toString()
      const product = await ProductService.getProductById(productId)

      const notificationPayload: INotificationPayload = {
        type: 'product_requested',
        productId,
        senderId: productRequest.userId.toString(),
        receiverId: product.userId,
      }

      await NotificationService.newNotification(notificationPayload)
    }
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
      throw new HttpException('Product request not found', 404)
    }
    const productId = productRequest.productId.toString()
    const isRequestAccepted = productRequest.status === 'Accepted'
    const product = await ProductService.getProductById(productId)

    const notificationPayload: INotificationPayload = {
      type: isRequestAccepted
        ? 'product_request_accepted'
        : 'product_request_rejected',
      productId,
      receiverId: productRequest.userId.toString(),
      senderId: product.userId,
    }
    await NotificationService.newNotification(notificationPayload)

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

async function deleteProductRequests(productId: string) {
  try {
    const productRequests = await ProductRequest.deleteMany({
      productId: new mongoose.Types.ObjectId(productId),
    })

    return productRequests
  } catch (error) {
    throw new HttpException(error)
  }
}

export default {
  getProductRequests,
  getProductRequestById,
  getMyRequests,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  deleteProductRequests,
}
