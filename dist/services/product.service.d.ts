import mongoose from 'mongoose';
import { IAllProductQuery, IProduct, IProductPayload } from '../interfaces/product.interface';
declare function getProducts({ search, categories, limit, offset, excludeIds, }: IAllProductQuery): Promise<any[]>;
declare function getMyProducts(id: string, search: string, categories: string): Promise<IProduct[]>;
declare function getProductById(id: string): Promise<IProduct>;
declare function createProduct(payload: IProductPayload): Promise<IProduct & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}>;
declare function updateProduct(id: string, payload: IProductPayload): Promise<IProduct & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}>;
declare function deleteProduct(id: string): Promise<IProduct & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const _default: {
    getProducts: typeof getProducts;
    getMyProducts: typeof getMyProducts;
    getProductById: typeof getProductById;
    createProduct: typeof createProduct;
    updateProduct: typeof updateProduct;
    deleteProduct: typeof deleteProduct;
};
export default _default;
