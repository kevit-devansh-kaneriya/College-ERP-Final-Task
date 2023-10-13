import bcrypt = require('bcrypt');
import {
	createNewUser,
	findUsers,
	findUserById,
	findUserByEmail,
} from './user.DAL';
import { sendToken } from './user.helper';
const randomString = require('randomstring');

export async function createAdmin(req, res, next) {
	try {
		const adminObject = req.body;
		if (
			!adminObject.firstName ||
			!adminObject.lastName ||
			!adminObject.emailId ||
			!adminObject.password
		) {
			return next(res.status(400).send('Please provide all the information'));
		}

		if (adminObject.role !== 'admin') {
			return next(res.status(400).send('Only for Admin role'));
		}

		const user = await createNewUser(adminObject);
		
		await sendToken(user, 200, res);
	} catch (err) {
		return next(err);
	}
}

export async function loginUser(req, res, next) {
	try {
		const { emailId, password } = req.body;
		if (!emailId || !password) {
			return next(res.status(400).send('EMAIL_OR_PASSWORD_NOT_FOUND'));
		}

		const user = await findUserByEmail(emailId);
		if (!user) {
			return next(res.status(400).send('User not found for emailId id'));
		}
		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched) {
			return next(res.status(400).send('Invalid Credentials'));
		}
		
		sendToken(user, 200, res);
	} catch (err) {
		return next(err);
	}
}


export async function createStaff(req, res, next) {
	const staffObject = req.body;
	if (
		!staffObject.firstName ||
		!staffObject.lastName ||
		!staffObject.emailId
	) {
		return next(res.status(400).send('Please provide all information.'));
	}
	staffObject.password = randomString.generate(7);
	try {
		const staff = await createNewUser(staffObject);			
		return res.status(200).send({ data: staff });
	} catch (err) {
		return next(err);
	}
}


export async function getUsers(req, res, next) {
	try {
		const users = await findUsers();
		return res.status(200).send({ data: users });
	} catch (err) {
		return next(err);
	}
}

export async function getMyProfile(req, res, next) {
	try {
		const user = await findUserById(req.user.id);
		return res.status(200).send({ data: user });
	} catch (err) {
		return next(err);
	}
}


export async function getUserProfileById(req, res, next) {
	try {
		const user = await findUserById(req.params.id);
		return res.status(200).send({ data: user });
	} catch (err) {
		return next(err);
	}
}

export async function updateUser(req, res, next) {
	const updates = Object.keys(req.body);
	console.log(updates);
	const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
	const isValidUpdation = updates.every((update) =>
		allowedUpdates.includes(update),
	);

	if (!isValidUpdation) {
		return next(res.status(400).send('Invalid updates'));
	}
	try {
		updates.forEach((update) => {
			req.user[update] = req.body[update];
		});
		await req.user.save();
		return res.status(200).send({ data: req.user });
	} catch (err) {
		return next(err);
	}
}

export async function deleteUser(req, res, next) {
	try {
		const id = req.user.id;
		const user = await findUserById(id);
		if (!user) {
			return next(res.status(404).send('USER_NOT_FOUND'));
		}
		await user.delete();

		return res.status(200).send({ data: user });
	} catch (err) {
		return next(err);
	}
}


export async function logoutUser(req, res, next) {
	try {
		req.user.tokens = req.user.tokens.filter(
			(accessToken) => accessToken.token !== req.token,
		);
		res.cookie('token', 'none', {
			expires: new Date(Date.now()),
			httpOnly: true,
		});
		await req.user.save();
		
		return res.status(200).send({ data: req.user });
	} catch (err) {
		return next(err);
	}
}


export async function logoutUserFromAll(req, res, next) {
    try {
        req.user.tokens = [];
        await req.user.save();
        return res.status(200).send({ data: req.user });
    } catch (err) {
        const statusCode = 500;
        const errorMessage = 'Failed to logout user from all devices';
        return next({ statusCode, message: errorMessage, originalError: err });
    }
}
