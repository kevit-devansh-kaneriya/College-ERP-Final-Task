"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vacantSeatDetails = exports.getAllBatches = exports.createBatch = void 0;
const batch_DAL_1 = require("./batch.DAL");
async function createBatch(req, res, next) {
    try {
        const batchObject = req.body;
        if (!batchObject.year || !batchObject.branches) {
            return next(res.status(404).send('Incomplete data to create batch'));
        }
        const batch = await (0, batch_DAL_1.createNewBatch)(batchObject);
        return res.status(200).send({ data: batch });
    }
    catch (err) {
        return next(err);
    }
}
exports.createBatch = createBatch;
async function getAllBatches(req, res, next) {
    try {
        const batches = await (0, batch_DAL_1.findAllBatches)();
        return res.status(200).send({ data: batches });
    }
    catch (err) {
        return next(err);
    }
}
exports.getAllBatches = getAllBatches;
async function vacantSeatDetails(req, res, next) {
    try {
        const batch = await (0, batch_DAL_1.findSeatVacantDetails)(req.params.year);
        if (!batch) {
            return next(res.status(404).send('BATCH NOT FOUND'));
        }
        let totalStudents = 0;
        batch.branches.forEach((branch) => (totalStudents += branch.totalStudents));
        batch.totalStudents = totalStudents;
        batch.availableIntake = batch.totalSeats - totalStudents;
        return res.status(200).send({ data: batch });
    }
    catch (err) {
        return next(err);
    }
}
exports.vacantSeatDetails = vacantSeatDetails;
//# sourceMappingURL=batch.controller.js.map