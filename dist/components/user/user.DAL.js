"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneUser = exports.findUsers = exports.findUserByEmail = exports.findUserByIdAndUpdate = exports.findUserById = exports.createNewUser = void 0;
const User = require('./user.model');
async function createNewUser(adminBody) {
    try {
        return await User.create(adminBody);
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'User already exist';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.createNewUser = createNewUser;
async function findUserById(id) {
    try {
        return await User.findOne({ id });
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'USER_NOT_FOUND';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findUserById = findUserById;
async function findUserByIdAndUpdate(id, update) {
    try {
        console.log(id, update);
        return await User.findUserByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'USER_NOT_FOUND';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findUserByIdAndUpdate = findUserByIdAndUpdate;
async function findUserByEmail(emailId) {
    try {
        return await User.findOne({ emailId });
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'USER_NOT_FOUND';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findUserByEmail = findUserByEmail;
async function findUsers() {
    try {
        return await User.find().lean().select('-password -tokens');
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'USER_NOT_FOUND';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findUsers = findUsers;
async function findOneUser(id, token) {
    try {
        return await User.findOne({ _id: id, 'tokens.token': token });
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'USER_NOT_FOUND';
        throw { statusCode, message: errorMessage, originalError: err };
    }
}
exports.findOneUser = findOneUser;
//# sourceMappingURL=user.DAL.js.map