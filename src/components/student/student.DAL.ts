// import HttpException from '../../utils/error.utils';
// import STUDENT_ERROR_CODES from './student.errors';
// eslint-disable-next-line import/no-named-as-default
// import User from './user.model';
const Student = require('./student.model');

/**
 * Add Student in DB
 * @param studentObject => Student Object to be created.
 */
export async function addStudentInDB(studentObject) {
	try {
		return await Student.create(studentObject);
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'ADD_STUDENT_UNHANDLED_IN_DB'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}