"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const env_config_1 = require("../../src/config/env.config");
const { OAuth2 } = googleapis_1.google.auth;
const createTransporter = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const oauth2Client = new OAuth2(env_config_1.GMAIL_API_CLIENT_ID, env_config_1.GMAIL_API_CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
    oauth2Client.setCredentials({
        refresh_token: env_config_1.GMAIL_API_REFRESH_TOKEN,
    });
    const accessToken = yield new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.error('err', err);
                reject();
            }
            resolve(token);
        });
    });
    const transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: env_config_1.GMAIL_EMAIL_USER,
            accessToken,
            clientId: env_config_1.GMAIL_API_CLIENT_ID,
            clientSecret: env_config_1.GMAIL_API_CLIENT_SECRET,
            refreshToken: env_config_1.GMAIL_API_REFRESH_TOKEN,
        },
    });
    return transporter;
});
exports.default = createTransporter;
//# sourceMappingURL=mailTransporter.js.map