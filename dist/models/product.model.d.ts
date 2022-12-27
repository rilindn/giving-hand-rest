import mongoose from 'mongoose';
import { IProduct } from '../src/interfaces/product.interface';
declare const Product: mongoose.Model<IProduct & mongoose.Document<any, any, any>, {}, {}, {}, any>;
export default Product;
