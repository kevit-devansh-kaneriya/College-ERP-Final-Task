"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../utils/auth");
const user_controller_1 = require("./user.controller");
const authRoles = require('../../utils/authRole');
class UsersRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signup', user_controller_1.createAdmin);
        this.router.post('/login', user_controller_1.loginUser);
        this.router.post('/staff', auth_1.default, authRoles('admin'), user_controller_1.createStaff);
        this.router.get('/', auth_1.default, user_controller_1.getUsers);
        this.router.patch('/update', auth_1.default, user_controller_1.updateUser);
        this.router.get('/me', auth_1.default, user_controller_1.getMyProfile);
        this.router.get('/:id', auth_1.default, user_controller_1.getUserProfileById);
        this.router.delete('/delete', auth_1.default, user_controller_1.deleteUser);
        this.router.put('/logout', auth_1.default, user_controller_1.logoutUser);
        this.router.put('/logoutAll', auth_1.default, user_controller_1.logoutUserFromAll);
    }
}
exports.default = new UsersRoute().router;
//# sourceMappingURL=user.routes.js.map