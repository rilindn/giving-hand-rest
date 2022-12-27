'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const http_errors_1 = tslib_1.__importDefault(require('http-errors'))
const logger_1 = require('../utils/logger')
const validator = (schema, body, next) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const value = yield schema.validate(body)
    try {
      if (value.error) {
        next((0, http_errors_1.default)(422, value.error.details[0].message))
      } else next()
    } catch (error) {
      logger_1.logger.error(error)
    }
  })
exports.default = validator
//# sourceMappingURL=validator.middleware.js.map
