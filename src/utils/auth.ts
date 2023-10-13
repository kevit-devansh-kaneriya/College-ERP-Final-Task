import * as fs from 'fs';
import { join } from 'path';
import jwt = require('jsonwebtoken');
import { findOneUser } from '../components/user/user.DAL';

/**
 * Middleware to verify token and User from DB
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */
// eslint-disable-next-line consistent-return

export default async (req, res, next) => {
	let token;
	//getting token from headers
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}
	if (!token || token === 'null') {
		return next(res.status(401).send('Login to access resourse'));
	}
	const privateKey = fs.readFileSync(
		join(__dirname, '../../keys/Private.key'),
	);

	try {
		const decoded = jwt.verify(token, privateKey);
		const user = await findOneUser(decoded.id, token);
		if (!user) {
			return next(res.status(401).send('UNAUTHENTICATED'));
		}
		req.user = user;
		// console.log(req.user);
		req.token = token;
		next();
	} catch (error) {
		return next(res.status(401).send('UNAUTHENTICATED'));
	}
};
