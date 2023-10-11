"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const USER_ERROR_CODES = {
    UNAUTHENTICATED: 'Invalid Credentials',
    UNAUTHORIZED: 'Only for Admin role',
    USERS_NOT_FOUND: 'No users found',
    USER_NOT_FOUND: 'User not found for emailId id',
    USER_ID_NOT_FOUND: 'User Id not found',
    CREATE_USER_UNHANDLED_IN_DB: 'Something went wrong while creating new user',
    EMAIL_OR_PASSWORD_NOT_FOUND: 'Email or Password not present.',
    NO_USER_LOGGED_IN: 'Login to access resourse.',
    INVALID_UPDATES: 'Invalid updates',
    INCOMPLETE_DATA: 'Please provide all the information.',
};
exports.default = USER_ERROR_CODES;
//# sourceMappingURL=user.errors.js.map