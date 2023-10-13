"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const sendToken = async (user, statusCode, res) => {
    const token = await user.getJwtToken();
    const cookietime = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statusCode).cookie('token', token, cookietime).json({
        token,
    });
};
exports.sendToken = sendToken;
//# sourceMappingURL=user.helper.js.map