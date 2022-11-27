import { Request, Response, NextFunction } from 'express'

import {
  IAllProductQuery,
  IProduct,
  IProductGetParams,
} from '@interfaces/product.interface'
import ProductService from '@services/product.service'

async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  const {
    search = '',
    categories = '',
    limit = 12,
    offset = 0,
  }: IAllProductQuery = req.query
  try {
    const products: IProduct[] = await ProductService.getProducts({
      search,
      categories,
      limit,
      offset,
    })
    return res.send(products)
  } catch (error) {
    next(error)
  }
}

async function getProductById(req: Request, res: Response, next: NextFunction) {
  const { id }: IProductGetParams = req.params
  try {
    const product: IProduct = await ProductService.getProductById(id)
    return res.send(product)
  } catch (error) {
    next(error)
  }
}

async function getMyProducts(req: Request, res: Response, next: NextFunction) {
  const { id }: IProductGetParams = req.params
  try {
    const products: IProduct[] = await ProductService.getMyProducts(id)
    return res.send(products)
  } catch (error) {
    next(error)
  }
}

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product: IProduct = await ProductService.createProduct(req.body)
    return res.send(product)
  } catch (error) {
    next(error)
  }
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  const { id }: { id?: string } = req.params
  try {
    const product: IProduct = await ProductService.updateProduct(id, req.body)
    return res.send(product)
  } catch (error) {
    next(error)
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const { id }: { id?: string } = req.params
  try {
    const product: IProduct = await ProductService.deleteProduct(id)
    return res.send(product)
  } catch (error) {
    next(error)
  }
}

export default {
  getAllProducts,
  getMyProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
