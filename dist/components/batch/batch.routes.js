"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoles = require('../../utils/authRole');
class BatchRoute {
    constructor() {
        this.router = (0, express_1.Router)();
    }
}
exports.default = new BatchRoute().router;
//# sourceMappingURL=batch.routes.js.map