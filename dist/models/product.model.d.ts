import mongoose from 'mongoose';
import { IProduct } from '../interfaces/product.interface';
declare const Product: mongoose.Model<IProduct & mongoose.Document<any, any, any>, {}, {}, {}, any>;
export default Product;
