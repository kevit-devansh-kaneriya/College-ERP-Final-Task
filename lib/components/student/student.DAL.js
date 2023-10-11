"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLowattendenceStudents = exports.findBranchAbsentStudents = exports.findAllAbsentStudents = exports.deleteStudentById = exports.getStudentById = exports.addStudentInDB = void 0;
const Student = require('./student.model');
async function addStudentInDB(studentObject) {
    try {
        return await Student.create(studentObject);
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'ADD_STUDENT_UNHANDLED_IN_DB';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.addStudentInDB = addStudentInDB;
async function getStudentById(studentId) {
    try {
        return await Student.findOne({ _id: studentId });
    }
    catch (err) {
        const statusCode = 404;
        const errorMessage = 'No student found';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.getStudentById = getStudentById;
async function deleteStudentById(studentId) {
    try {
        return await Student.findByIdAndDelete(studentId);
    }
    catch (err) {
        const statusCode = 404;
        const errorMessage = 'No student found';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.deleteStudentById = deleteStudentById;
async function findAllAbsentStudents(date) {
    try {
        return await Student.find({
            notAttended: { $elemMatch: { $eq: date } },
        });
    }
    catch (err) {
        const statusCode = 404;
        const errorMessage = 'No student found';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findAllAbsentStudents = findAllAbsentStudents;
async function findBranchAbsentStudents(batch, branch, currentSemester, date) {
    try {
        return await Student.find({
            $and: [
                { batch },
                { branch },
                { currentSemester },
                { notAttended: { $elemMatch: { $eq: date } } },
            ],
        });
    }
    catch (err) {
        const statusCode = 404;
        const errorMessage = 'No student found';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findBranchAbsentStudents = findBranchAbsentStudents;
async function findLowattendenceStudents(batch, branch, currentSemester, value) {
    try {
        return await Student.find({
            batch,
            branch,
            currentSemester,
            attendence: { $lt: value },
        });
    }
    catch (err) {
        const statusCode = 404;
        const errorMessage = 'No student found';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findLowattendenceStudents = findLowattendenceStudents;
//# sourceMappingURL=student.DAL.js.map