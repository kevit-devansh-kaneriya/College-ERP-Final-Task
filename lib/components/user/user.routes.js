"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoles = require('../../utils/authRole');
class UsersRoute {
    constructor() {
        this.router = (0, express_1.Router)();
    }
}
exports.default = new UsersRoute().router;
//# sourceMappingURL=user.routes.js.map