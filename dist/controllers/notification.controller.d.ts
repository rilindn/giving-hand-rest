import { Request, Response, NextFunction } from 'express';
declare function getNotifications(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function newNotification(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function readAllNotifications(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getNotifications: typeof getNotifications;
    newNotification: typeof newNotification;
    readAllNotifications: typeof readAllNotifications;
};
export default _default;
