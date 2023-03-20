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
import { IResetTokenPayload, IResetTokenSearch } from '../interfaces/resetToken.interface';
declare function findToken(params: IResetTokenSearch): Promise<import("../interfaces/resetToken.interface").IResetToken & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare function deleteInvalidResetToken(email?: string): Promise<import("mongodb").DeleteResult>;
declare function newResetToken(payload: IResetTokenPayload): Promise<import("../interfaces/resetToken.interface").IResetToken & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const _default: {
    findToken: typeof findToken;
    deleteInvalidResetToken: typeof deleteInvalidResetToken;
    newResetToken: typeof newResetToken;
};
export default _default;
