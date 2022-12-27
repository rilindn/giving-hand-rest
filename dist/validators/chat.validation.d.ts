/// <reference types="qs" />
import { RequestHandler } from 'express';
export declare const createChatValidation: RequestHandler;
export declare const newMessageValidation: RequestHandler;
declare const _default: {
    createChatValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    newMessageValidation: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
};
export default _default;
