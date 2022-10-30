import { Request, Response, NextFunction } from 'express'

import { IProduct } from '@interfaces/product.interface'
import ProductService from '@services/product.service'

async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const products: IProduct[] = await ProductService.getProducts()
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
  const { id }: { id?: string } = req.query
  try {
    const product: IProduct = await ProductService.updateProduct(id, req.body)
    return res.send(product)
  } catch (error) {
    next(error)
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const { id }: { id?: string } = req.query
  try {
    const product: IProduct = await ProductService.deleteProduct(id)
    return res.send(product)
  } catch (error) {
    next(error)
  }
}

export default {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}
