import { Request, Response, NextFunction } from 'express'

import {
  IProductRequest,
  IProductRequestGetParams,
} from '@interfaces/productRequest.interface'
import ProductRequestService from '@services/productRequest.service'

async function getAllProductRequests(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const productRequests: IProductRequest[] =
      await ProductRequestService.getProductRequests()

    return res.send(productRequests)
  } catch (error) {
    next(error)
  }
}

async function getProductRequestById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id }: IProductRequestGetParams = req.params
  try {
    const productRequest: IProductRequest =
      await ProductRequestService.getProductRequestById(id)

    return res.send(productRequest)
  } catch (error) {
    next(error)
  }
}

async function createProductRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const productRequest: IProductRequest =
      await ProductRequestService.createProductRequest(req.body)

    return res.send(productRequest)
  } catch (error) {
    next(error)
  }
}

async function updateProductRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id }: { id?: string } = req.params
  try {
    const productRequest: IProductRequest =
      await ProductRequestService.updateProductRequest(id, req.body)

    return res.send(productRequest)
  } catch (error) {
    next(error)
  }
}

async function deleteProductRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id }: { id?: string } = req.query
  try {
    const productRequest: IProductRequest =
      await ProductRequestService.deleteProductRequest(id)

    return res.send(productRequest)
  } catch (error) {
    next(error)
  }
}

export default {
  getAllProductRequests,
  getProductRequestById,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
}
