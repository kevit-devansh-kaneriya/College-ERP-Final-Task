export const sendToken = async (user, statusCode, res) => {
	//create jwt token
	const token = await user.getJwtToken();

	const cookietime = {
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	res.status(statusCode).cookie('token', token, cookietime).json({
		token,
	});
};
