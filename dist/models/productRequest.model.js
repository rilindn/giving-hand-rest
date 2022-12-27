"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const ProductRequestSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
    },
    productId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
}, {
    timestamps: true,
    collection: 'productRequests',
});
const ProductRequest = (0, mongoose_1.model)('ProductRequest', ProductRequestSchema);
exports.default = ProductRequest;
//# sourceMappingURL=productRequest.model.js.map