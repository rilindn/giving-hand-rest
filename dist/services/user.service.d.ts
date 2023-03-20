/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IUser, IUserRegister, IUserSearch } from '../interfaces/user.interface';
declare function getUsers(): Promise<(IUser & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
declare function getUserById(id: string): Promise<IUser & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare function findUser(params: IUserSearch): Promise<IUser & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare function registerUser(payload: IUserRegister): Promise<IUser & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare function updateUser(id: string, payload: IUser): Promise<IUser & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare function deleteUser(id: string): Promise<IUser & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const _default: {
    getUsers: typeof getUsers;
    getUserById: typeof getUserById;
    findUser: typeof findUser;
    updateUser: typeof updateUser;
    deleteUser: typeof deleteUser;
    registerUser: typeof registerUser;
};
export default _default;
