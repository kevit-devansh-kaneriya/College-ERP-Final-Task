"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = require("./components/user/user.routes");
const batch_routes_1 = require("./components/batch/batch.routes");
const student_routes_1 = require("./components/student/student.routes");
const index_1 = require("./index");
class ApplicationConfig {
    static registerRoute(app) {
        app.use('/', index_1.default);
        app.use('/users', user_routes_1.default);
        app.use('/batches', batch_routes_1.default);
        app.use('/students', student_routes_1.default);
    }
}
exports.default = ApplicationConfig;
//# sourceMappingURL=application.routes.js.map