const User = require('./user.model');

/**
 * Creates new Admin in DB
 * @param adminBody => Admin Object to be created.
 */

export async function createNewUser(adminBody) {
	try {
		return await User.create(adminBody);
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'User already exist'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * Finds User by id from DB
 * @param id => User Object to be found.
 */

export async function findUserById(id) {
	try {
		return await User.findOne({ id });
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'USER_NOT_FOUND'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * Finds User by id and update from DB
 * @param id => User Object to be found.
 * @param update => User info to be update.
 */

export async function findUserByIdAndUpdate(id, update) {
	try {
		console.log(id, update);
		return await User.findUserByIdAndUpdate(id, update, {
			new: true,
			runValidators: true,
		});
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'USER_NOT_FOUND'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * Find User by email from DB
 * @param emailId => Email of the user
 */

export async function findUserByEmail(emailId) {
	try {
		return await User.findOne({ emailId });
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'USER_NOT_FOUND'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * List Users from DB
 */

export async function findUsers() {
	try {
		return await User.find().lean().select('-password -tokens');
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'USER_NOT_FOUND'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * Find one user from DB
 * @param id => ID of the user
 * @param token => jwt token of the user
 */

export async function findOneUser(id, token) {
	try {
		return await User.findOne({ _id: id, 'tokens.token': token });
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'USER_NOT_FOUND'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}
