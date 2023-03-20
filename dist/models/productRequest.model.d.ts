import mongoose from 'mongoose';
import { IProductRequest } from '../interfaces/productRequest.interface';
declare const ProductRequest: mongoose.Model<IProductRequest & mongoose.Document<any, any, any>, {}, {}, {}, any>;
export default ProductRequest;
