"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../utils/auth");
const student_controller_1 = require("./student.controller");
const authRoles = require('../../utils/authRole');
class StudentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/addStudent', auth_1.default, authRoles('admin', 'staff'), student_controller_1.addStudent);
    }
}
exports.default = new StudentRoutes().router;
//# sourceMappingURL=student.routes.js.map