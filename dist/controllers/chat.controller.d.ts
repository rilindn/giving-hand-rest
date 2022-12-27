/// <reference types="qs" />
import { NextFunction, Request, Response } from 'express';
declare function getMyChats(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function createChat(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function newMessage(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function readAllMessages(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getMyChats: typeof getMyChats;
    createChat: typeof createChat;
    newMessage: typeof newMessage;
    readAllMessages: typeof readAllMessages;
    deleteMessage: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
