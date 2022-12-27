import { Request, Response, NextFunction } from 'express';
declare function getAllProductRequests(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function getMyRequests(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function getProductRequestById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function createProductRequest(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function updateProductRequest(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function deleteProductRequest(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getAllProductRequests: typeof getAllProductRequests;
    getMyRequests: typeof getMyRequests;
    getProductRequestById: typeof getProductRequestById;
    createProductRequest: typeof createProductRequest;
    updateProductRequest: typeof updateProductRequest;
    deleteProductRequest: typeof deleteProductRequest;
};
export default _default;
