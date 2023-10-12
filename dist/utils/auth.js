"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const jwt = require("jsonwebtoken");
const user_DAL_1 = require("../components/user/user.DAL");
exports.default = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token || token === 'null') {
        return next(res.status(401).send('Login to access resourse'));
    }
    const privateKey = fs.readFileSync((0, path_1.join)(__dirname, '../../keys/Private.key'));
    try {
        const decoded = jwt.verify(token, privateKey);
        const user = await (0, user_DAL_1.findOneUser)(decoded.id, token);
        if (!user) {
            return next(res.status(401).send('UNAUTHENTICATED'));
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        return next(res.status(401).send('UNAUTHENTICATED'));
    }
};
//# sourceMappingURL=auth.js.map