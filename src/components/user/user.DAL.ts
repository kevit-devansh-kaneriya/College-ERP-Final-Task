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
