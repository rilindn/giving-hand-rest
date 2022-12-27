"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const HttpException_1 = tslib_1.__importDefault(require("../src/utils/HttpException"));
const productRequest_model_1 = tslib_1.__importDefault(require("../src/models/productRequest.model"));
const notification_service_1 = tslib_1.__importDefault(require("../src/services/notification.service"));
const product_service_1 = tslib_1.__importDefault(require("../src/services/product.service"));
function getProductRequests() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const productRequests = yield productRequest_model_1.default.find().sort({
                createdAt: 'descending',
            });
            return productRequests;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function getProductRequestById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const productRequest = yield productRequest_model_1.default.aggregate([
                {
                    $match: { _id: new mongoose_1.default.Types.ObjectId(id) },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $unwind: '$user',
                },
            ]);
            if (!productRequest) {
                throw new HttpException_1.default('ProductRequest not found', 404);
            }
            return lodash_1.default.first(productRequest);
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function getMyRequests(id, search, status) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const query = [
            {
                $match: Object.assign({ userId: new mongoose_1.default.Types.ObjectId(id) }, (status && status !== 'All' && { status })),
            },
            {
                $lookup: {
                    from: 'products',
                    let: { id: '$productId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$id'] },
                            },
                        },
                        {
                            $lookup: {
                                from: 'users',
                                let: { userId: '$userId' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$_id', '$$userId'],
                                            },
                                        },
                                    },
                                ],
                                as: 'user',
                            },
                        },
                        {
                            $unwind: '$user',
                        },
                    ],
                    as: 'product',
                },
            },
            {
                $unwind: '$product',
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
                $match: Object.assign({}, (search && {
                    $or: [
                        { description: { $regex: search, $options: 'i' } },
                        { 'product.title': { $regex: search, $options: 'i' } },
                        { 'product.description': { $regex: search, $options: 'i' } },
                    ],
                })),
            },
        ];
        try {
            const products = yield productRequest_model_1.default.aggregate(query).sort({ createdAt: 'descending' });
            return products;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function createProductRequest(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const productRequest = new productRequest_model_1.default(Object.assign({}, payload));
            yield productRequest.save();
            if (productRequest) {
                const productId = productRequest.productId.toString();
                const product = yield product_service_1.default.getProductById(productId);
                const notificationPayload = {
                    type: 'product_requested',
                    productId,
                    senderId: productRequest.userId.toString(),
                    receiverId: product.userId,
                };
                yield notification_service_1.default.newNotification(notificationPayload);
            }
            return productRequest;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function updateProductRequest(id, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const productRequestId = id.toString();
        try {
            const productRequest = yield productRequest_model_1.default.findByIdAndUpdate(productRequestId, payload, {
                returnOriginal: false,
            });
            if (!productRequest) {
                throw new HttpException_1.default('Product request not found', 404);
            }
            const productId = productRequest.productId.toString();
            const isRequestAccepted = productRequest.status === 'Accepted';
            const product = yield product_service_1.default.getProductById(productId);
            const notificationPayload = {
                type: isRequestAccepted
                    ? 'product_request_accepted'
                    : 'product_request_rejected',
                productId,
                receiverId: productRequest.userId.toString(),
                senderId: product.userId,
            };
            yield notification_service_1.default.newNotification(notificationPayload);
            return productRequest;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function deleteProductRequest(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const productRequest = yield productRequest_model_1.default.findByIdAndDelete(id);
            if (!productRequest) {
                throw new HttpException_1.default('ProductRequest not found', 404);
            }
            return productRequest;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function deleteProductRequests(productId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const productRequests = yield productRequest_model_1.default.deleteMany({
                productId: new mongoose_1.default.Types.ObjectId(productId),
            });
            return productRequests;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
exports.default = {
    getProductRequests,
    getProductRequestById,
    getMyRequests,
    createProductRequest,
    updateProductRequest,
    deleteProductRequest,
    deleteProductRequests,
};
//# sourceMappingURL=productRequest.service.js.map