const authRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(res.status(401).send(`Rights reserved to ${roles}`));
        }
        next();
    };
};
module.exports = authRoles;
//# sourceMappingURL=authRole.js.map