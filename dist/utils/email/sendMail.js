"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const nodemailer_express_handlebars_1 = tslib_1.__importDefault(require("nodemailer-express-handlebars"));
const env_config_1 = require("../../config/env.config");
const mailTransporter_1 = tslib_1.__importDefault(require("./mailTransporter"));
const constructTransporter = (user, magicLink) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Reset password';
    const transporter = yield (0, mailTransporter_1.default)();
    const options = {
        viewEngine: {
            extname: '.hbs',
            layoutsDir: path_1.default.resolve('./src/utils/email/template/'),
            defaultLayout: 'resetPassword',
            partialsDir: path_1.default.resolve('./src/utils/email/template/'),
        },
        viewPath: path_1.default.resolve('./src/utils/email/template/'),
        extName: '.hbs',
    };
    const mailOptions = {
        from: env_config_1.GMAIL_EMAIL_USER,
        to: user.email,
        subject,
        attachments: [
            {
                filename: 'logo.png',
                path: 'assets/logo.png',
                cid: 'logo',
            },
        ],
        template: 'resetPassword',
        context: {
            name: user.firstName,
            magicLink,
        },
    };
    transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(options));
    return { transporter, mailOptions };
});
exports.default = constructTransporter;
//# sourceMappingURL=sendMail.js.map