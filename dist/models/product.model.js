"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const ImageSchema = new mongoose_1.Schema({
    url: { type: String },
});
const LocationSchema = new mongoose_1.Schema({
    lng: { type: Number },
    lat: { type: Number },
    address: { type: String },
});
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [ImageSchema],
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
    categories: {
        type: [String],
    },
    location: {
        type: LocationSchema,
    },
}, {
    timestamps: true,
    collection: 'products',
});
const Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map