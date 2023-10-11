"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoles = require('../../utils/authRole');
class StudentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
}
exports.default = new StudentRoutes().router;
//# sourceMappingURL=student.routes.js.map