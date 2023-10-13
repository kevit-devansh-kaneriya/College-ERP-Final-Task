import bcrypt = require('bcrypt');
import mongoose from 'mongoose';
import jwt = require('jsonwebtoken');
import fs = require('fs');
import { join } from 'path';

const { Schema, model } = mongoose;

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

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
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
	const privateKey = fs.readFileSync(
		join(__dirname, '../../../keys/Private.key'),
	);
	const token = jwt.sign({ id: this._id }, privateKey, {
		expiresIn: '7d',
	});
	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};

module.exports = model('User', userSchema);