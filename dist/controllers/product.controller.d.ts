import { Request, Response, NextFunction } from 'express';
declare function getAllProducts(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function getProductById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function getMyProducts(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function createProduct(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function updateProduct(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getAllProducts: typeof getAllProducts;
    getMyProducts: typeof getMyProducts;
    getProductById: typeof getProductById;
    createProduct: typeof createProduct;
    updateProduct: typeof updateProduct;
    deleteProduct: typeof deleteProduct;
};
export default _default;
