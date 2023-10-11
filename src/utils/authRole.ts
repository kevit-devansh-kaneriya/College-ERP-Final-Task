/**
 * Middleware to verify user role is authorized or not
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */
// eslint-disable-next-line consistent-return

const authRoles = (...roles: string[]) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(res.status(401).send(`Rights reserved to ${roles}`));
		}
		next();
	};
};

module.exports = authRoles;
