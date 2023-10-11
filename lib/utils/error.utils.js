"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getErrorFromCode(statusCode) {
    switch (statusCode) {
        case 500: {
            return 'DATABASE_ERROR';
        }
        case 400: {
            return 'BAD_REQUEST';
        }
        case 401: {
            return 'UNAUTHORIZED';
        }
        case 424: {
            return 'FAILED_DEPENDENCY';
        }
        case 404: {
            return 'NOT_FOUND';
        }
        default:
            return 'UNHANDLED_ERROR';
    }
}
class HttpException extends Error {
    constructor(statusCode, message, errorCode, err, meta = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = getErrorFromCode(statusCode);
        this.errorCode = errorCode;
        this.message = message;
        this.originalError = err;
        this.meta = meta;
    }
}
exports.default = HttpException;
//# sourceMappingURL=error.utils.js.map