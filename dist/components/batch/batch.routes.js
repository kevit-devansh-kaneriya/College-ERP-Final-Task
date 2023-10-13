"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../utils/auth");
const batch_controller_1 = require("./batch.controller");
const authRoles = require('../../utils/authRole');
class BatchRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/newbatch', auth_1.default, authRoles('admin'), batch_controller_1.createBatch);
        this.router.get('/listbatches', auth_1.default, batch_controller_1.getAllBatches);
        this.router.get('/:year', auth_1.default, batch_controller_1.vacantSeatDetails);
    }
}
exports.default = new BatchRoute().router;
//# sourceMappingURL=batch.routes.js.map