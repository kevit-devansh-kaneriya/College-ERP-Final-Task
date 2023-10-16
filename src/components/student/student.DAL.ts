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

/**
 * find student by Id
 * @param studentId => Student Object to be find.
 */

export async function getStudentById(studentId) {
	try {
		return await Student.findOne({ _id: studentId });
	} catch (err) {
		const statusCode = 404; 
        const errorMessage = 'No student found'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * Delete student by Id
 * @param studentId => student Object to be deleted.
 */

export async function deleteStudentById(studentId) {
	try {
		return await Student.findByIdAndDelete(studentId);
	} catch (err) {
		const statusCode = 404; 
        const errorMessage = 'No student found'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * find all absent students
 * @param date => All absent Students to be found on date .
 */

export async function findAllAbsentStudents(date) {
	try {
		return await Student.find({
			notAttended: { $elemMatch: { $eq: date } },
		});
	} catch (err) {
		const statusCode = 404; 
        const errorMessage = 'No student found'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * find absent student of perticular branch, batch.
 * @param batch => Batch of student.
 * @param branch => Branch of student.
 * @param currentSemester => Semester of student.
 * @param date => Date of absentee.
 */

export async function findBranchAbsentStudents(
	batch,
	branch,
	currentSemester,
	date,
) {
	try {
		return await Student.find({
			$and: [
				{ batch },
				{ branch },
				{ currentSemester },
				{ notAttended: { $elemMatch: { $eq: date } } },
			],
		});
	} catch (err) {
		const statusCode = 404; 
        const errorMessage = 'No student found'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}
/**
 * find students of perticular batch,branch etc. with attendence less than value.
 * @param batch => Batch of student.
 * @param branch => Branch of student.
 * @param currentSemester => Semester of student.
 * @param value => less than Value of attendence .
 */

export async function findLowattendenceStudents(
	batch,
	branch,
	currentSemester,
	value,
) {
	try {
		return await Student.find({
			batch,
			branch,
			currentSemester,
			attendence: { $lt: value },
		});
	} catch (err) {
		const statusCode = 404; 
        const errorMessage = 'No student found'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}
