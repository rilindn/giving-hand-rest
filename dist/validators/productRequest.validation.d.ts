/// <reference types="qs" />
import { RequestHandler } from 'express';
export declare const createProductRequestValidation: RequestHandler;
export declare const updateProductRequestValidation: RequestHandler;
declare const _default: {
    createProductRequestValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    updateProductRequestValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
};
export default _default;
