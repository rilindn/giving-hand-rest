"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../src/utils/HttpException"));
const product_model_1 = tslib_1.__importDefault(require("../src/models/product.model"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const productRequest_service_1 = tslib_1.__importDefault(require("../src/services/productRequest.service"));
function getProducts({ search, categories, limit, offset, excludeIds = '', }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const categoriesArr = categories ? categories.split(',') : [];
        const searchQuery = search && [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
        const categoriesQuery = !!(categoriesArr === null || categoriesArr === void 0 ? void 0 : categoriesArr.length) && [
            {
                categories: { $in: categoriesArr },
            },
        ];
        const excludeIdsQuery = excludeIds &&
            excludeIds.split(',').map((id) => new mongoose_1.default.Types.ObjectId(id));
        try {
            const products = yield product_model_1.default.aggregate([
                {
                    $match: Object.assign(Object.assign({}, ((searchQuery || categoriesQuery) && {
                        $or: [...(searchQuery || []), ...(categoriesQuery || [])],
                    })), ((excludeIdsQuery === null || excludeIdsQuery === void 0 ? void 0 : excludeIdsQuery.length) && {
                        userId: { $nin: excludeIdsQuery },
                    })),
                },
                {
                    $lookup: {
                        from: 'productRequests',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'requests',
                    },
                },
                { $limit: +limit + +offset },
                { $skip: +offset },
            ]).sort({ createdAt: 'descending' });
            return products;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function getMyProducts(id, search, categories) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield product_model_1.default.aggregate([
                {
                    $match: Object.assign(Object.assign({ userId: new mongoose_1.default.Types.ObjectId(id) }, (search && {
                        $or: [
                            { title: { $regex: search, $options: 'i' } },
                            { description: { $regex: search, $options: 'i' } },
                            { 'location.address': { $regex: search, $options: 'i' } },
                        ],
                    })), (categories && categories !== 'all' && { categories })),
                },
                {
                    $lookup: {
                        from: 'productRequests',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'requests',
                    },
                },
            ]).sort({ createdAt: 'descending' });
            return products;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function getProductById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.aggregate([
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
                {
                    $lookup: {
                        from: 'productRequests',
                        let: { id: '$_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$productId', '$$id'] } } },
                            {
                                $lookup: {
                                    from: 'users',
                                    let: { userId: '$userId' },
                                    pipeline: [
                                        {
                                            $match: { $expr: { $eq: ['$_id', '$$userId'] } },
                                        },
                                    ],
                                    as: 'requester',
                                },
                            },
                            {
                                $unwind: '$requester',
                            },
                        ],
                        as: 'requests',
                    },
                },
                {
                    $project: {
                        'user.password': 0,
                    },
                },
            ]);
            if (!product)
                throw new HttpException_1.default('Product not found', 404);
            return lodash_1.default.first(product);
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function createProduct(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const product = new product_model_1.default(Object.assign({}, payload));
            yield product.save();
            return product;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function updateProduct(id, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const productId = id.toString();
        try {
            const product = yield product_model_1.default.findByIdAndUpdate(productId, payload, {
                returnOriginal: false,
            });
            if (!product)
                throw new HttpException_1.default('Product not found', 404);
            return product;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function deleteProduct(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.findByIdAndDelete(id);
            if (!product)
                throw new HttpException_1.default('Product not found', 404);
            const productRequests = yield productRequest_service_1.default.deleteProductRequests(id);
            return product;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
exports.default = {
    getProducts,
    getMyProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.service.js.map