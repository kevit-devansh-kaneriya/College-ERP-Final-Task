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
        this.router.get('/:id', auth_1.default, authRoles('admin', 'staff'), student_controller_1.getStudent);
        this.router.patch('/updatebatch/:id', auth_1.default, authRoles('admin', 'staff'), student_controller_1.updateBranchOrBatch);
        this.router.patch('/updateinfo/:id', auth_1.default, authRoles('admin', 'staff'), student_controller_1.updateStudentInfo);
        this.router.delete('/:id', auth_1.default, authRoles('admin', 'staff'), student_controller_1.deleteStudent);
        this.router.patch('/attendence/:id', auth_1.default, authRoles('admin', 'staff'), student_controller_1.addPresentAttendance);
        this.router.get('/allabsentstudents/:date', auth_1.default, authRoles('admin', 'staff'), student_controller_1.findAbsentStudents);
        this.router.get('/branchabsentees/find', auth_1.default, authRoles('admin', 'staff'), student_controller_1.findBranchAbsentees);
        this.router.get('/lessattendence/find', auth_1.default, authRoles('admin', 'staff'), student_controller_1.findLowAttendees);
    }
}
exports.default = new StudentRoutes().router;
//# sourceMappingURL=student.routes.js.map