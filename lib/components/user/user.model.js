"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path_1 = require("path");
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    emailId: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    role: {
        type: Schema.Types.String,
        enum: {
            values: ['admin', 'staff'],
            message: 'Please select correct role',
        },
        default: 'staff',
    },
});
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    }
    catch (err) {
        const statusCode = 500;
        const errorMessage = 'CREATE_USER_UNHANDLED_IN_DB';
        throw { statusCode, message: errorMessage, originalError: err };
    }
});
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
userSchema.methods.getJwtToken = async function () {
    const privateKey = fs.readFileSync((0, path_1.join)(__dirname, '../../../keys/Private.key'));
    const token = jwt.sign({ id: this._id }, privateKey, {
        expiresIn: '7d',
    });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};
module.exports = model('User', userSchema);
//# sourceMappingURL=user.model.js.map