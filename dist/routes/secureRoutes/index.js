"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_route_1 = tslib_1.__importDefault(require("./user.route"));
const product_route_1 = tslib_1.__importDefault(require("./product.route"));
const productRequest_route_1 = tslib_1.__importDefault(require("./productRequest.route"));
const notification_route_1 = tslib_1.__importDefault(require("./notification.route"));
const chat_route_1 = tslib_1.__importDefault(require("./chat.route"));
const router = express_1.default.Router();
router.use('/user', user_route_1.default);
router.use('/product', product_route_1.default);
router.use('/product-request', productRequest_route_1.default);
router.use('/notification', notification_route_1.default);
router.use('/chat', chat_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map