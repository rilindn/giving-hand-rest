import mongoose from 'mongoose';
import { IProductRequest, IProductRequestPayload } from '../src/interfaces/productRequest.interface';
declare function getProductRequests(): Promise<(IProductRequest & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
})[]>;
declare function getProductRequestById(id: string): Promise<IProductRequest>;
declare function getMyRequests(id: string, search: string, status: string): Promise<IProductRequest[]>;
declare function createProductRequest(payload: IProductRequestPayload): Promise<IProductRequest & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}>;
declare function updateProductRequest(id: string, payload: IProductRequestPayload): Promise<IProductRequest & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}>;
declare function deleteProductRequest(id: string): Promise<IProductRequest & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}>;
declare function deleteProductRequests(productId: string): Promise<import("mongodb").DeleteResult>;
declare const _default: {
    getProductRequests: typeof getProductRequests;
    getProductRequestById: typeof getProductRequestById;
    getMyRequests: typeof getMyRequests;
    createProductRequest: typeof createProductRequest;
    updateProductRequest: typeof updateProductRequest;
    deleteProductRequest: typeof deleteProductRequest;
    deleteProductRequests: typeof deleteProductRequests;
};
export default _default;
