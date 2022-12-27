/// <reference types="qs" />
import { RequestHandler } from 'express';
export declare const registerUserValidation: RequestHandler;
export declare const updateUserValidation: RequestHandler;
export declare const resetPasswordValidation: RequestHandler;
declare const _default: {
    registerUserValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    updateUserValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    resetPasswordValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
};
export default _default;
