/// <reference types="qs" />
import { RequestHandler } from 'express';
export declare const createProductValidation: RequestHandler;
export declare const updateProductValidation: RequestHandler;
declare const _default: {
    createProductValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    updateProductValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
};
export default _default;
