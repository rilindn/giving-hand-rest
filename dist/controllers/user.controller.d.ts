import { Request, Response, NextFunction } from 'express';
declare function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function getUserById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function updateUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
declare const _default: {
    getAllUsers: typeof getAllUsers;
    getUserById: typeof getUserById;
    updateUser: typeof updateUser;
    deleteUser: typeof deleteUser;
};
export default _default;
