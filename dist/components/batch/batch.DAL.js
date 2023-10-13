"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBatch = exports.findSeatVacantDetails = exports.findAllBatches = exports.createNewBatch = void 0;
const Batch = require('./batch.model');
async function createNewBatch(batchBody) {
    try {
        return await Batch.create(batchBody);
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'Batch already exist or Invalid data.';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.createNewBatch = createNewBatch;
async function findAllBatches() {
    try {
        return await Batch.aggregate([
            {
                $unwind: '$branches',
            },
            {
                $group: {
                    _id: '$year',
                    totalStudents: { $sum: '$branches.totalStudents' },
                    branches: {
                        $push: {
                            k: '$branches.name',
                            v: '$branches.totalStudents',
                        },
                    },
                },
            },
            {
                $group: {
                    _id: '$_id',
                    totalStudents: { $first: '$totalStudents' },
                    branches: { $push: { $arrayToObject: '$branches' } },
                },
            },
            {
                $project: {
                    year: '$_id',
                    _id: 0,
                    totalStudents: 1,
                    branches: 1,
                },
            },
        ]);
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'UNHANDLED PROMISE ERROR';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findAllBatches = findAllBatches;
async function findSeatVacantDetails(year) {
    try {
        return await Batch.findOne({ year }).lean();
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'UNHANDLED PROMISE ERROR';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findSeatVacantDetails = findSeatVacantDetails;
async function findBatch(year, branch) {
    try {
        return await Batch.findOne({ year, 'branches.name': branch });
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'BATCH OR BRANCH NOT AVAILABLE';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findBatch = findBatch;
//# sourceMappingURL=batch.DAL.js.map