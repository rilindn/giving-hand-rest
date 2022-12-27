"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const auth_route_1 = tslib_1.__importDefault(require("./auth.route"));
const router = express_1.default.Router();
router.use('/auth', auth_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map