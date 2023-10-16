import { findBatch } from '../batch/batch.DAL';
import {
	addStudentInDB,
	getStudentById,
	deleteStudentById,
	findAllAbsentStudents,
	findBranchAbsentStudents,
	findLowattendenceStudents,
} from './student.DAL';

export async function addStudent(req, res, next) {
	try {
		const studentObject = req.body;
		if (
			!studentObject.firstName ||
			!studentObject.lastName ||
			!studentObject.emailId ||
			!studentObject.address ||
			!studentObject.contactNo ||
			!studentObject.batch ||
			!studentObject.branch
		) {
			return next(res.status(400).send('Please provide all required credentials'));
		}
		const batch = await findBatch(
			studentObject.batch,
			studentObject.branch,
		);

		if (!batch) {
			return next(res.status(404).send('Batch or branch does not exist'));
		}
		batch.branches.forEach((branch) => {
			if (
				branch.name === studentObject.branch &&
				branch.availableIntake === 0
			) {
				return next(res.status(404).send('No seats available for this branch'));
			}
			if (branch.name === studentObject.branch) {
				branch.availableIntake--;
				branch.totalStudents++;
			}
		});

		const student = await addStudentInDB(studentObject);
		await batch.save();
		
		return res.status(200).send({ data: student });
	} catch (err) {
		return next(err);
	}
}


export async function getStudent(req, res, next) {
	const studentId = req.params.id;
	try {
		const student = await getStudentById(studentId);
		if (!student) {
			return next(res.status(404).send('No student found'));
		}
		return res.status(200).send({ data: student });
	} catch (err) {
		return next(err);
	}
}

export async function updateBranchOrBatch(req, res, next) {
	try {
		const id = req.params.id;
		const { branch, batch } = req.body;
		if (!batch || !branch) {
			return next(res.status(400).send('Please provide a branch and batch.'));
		}
		const student = await getStudentById(id);
		const oldBatch = student.batch;
		const oldBranch = student.branch;
		if (!student) {
			return next(res.status(404).send('No student found'));
		}

		const newBatch = await findBatch(batch, branch);

		if (!newBatch) {
			return next(res.status(404).send('BATCH OR BRANCH NOT AVAILABLE'));
		}

		newBatch.branches.forEach((newBranch) => {
			if (
				newBranch.name === branch &&
				newBranch.availableIntake === 0
			) {
				return next(res.status(500).send('No seats available for this branch'));
			}
			if (newBranch.name === branch) {
				newBranch.availableIntake--;
				newBranch.totalStudents++;
				console.log(newBranch);
			}
		});
		student.batch = batch;
		student.branch = branch;

		await newBatch.save();
		await student.save();

		const previousBatch = await findBatch(oldBatch, oldBranch);
		previousBatch.branches.forEach((branch) => {
			if (branch.name === oldBranch) {
				branch.availableIntake++;
				branch.totalStudents--;
			}
		});

		await previousBatch.save();
		
		return res.status(200).send({ data: student });
	} catch (err) {
		return next(err);
	}
}

export async function updateStudentInfo(req, res, next) {
	const updates = Object.keys(req.body);
	const studentId = req.params.id;
	const allowedUpdates = [
		'firstName',
		'lastName',
		'emailId',
		'address',
		'contactNo',
		'currentSemester',
	];
	const isValidUpdation = updates.every((update) =>
		allowedUpdates.includes(update),
	);

	if (!isValidUpdation) {
		return next(res.status(400).send('Invalid updates'));
	}
	try {
		const student = await getStudentById(studentId);
		updates.forEach((update) => {
			student[update] = req.body[update];
		});
		await student.save();
		
		return res.status(200).send({ data: student });
	} catch (err) {
		return next(err);
	}
}


export async function deleteStudent(req, res, next) {
	const studentId = req.params.id;
	try {
		const student = await deleteStudentById(studentId);
		if (!student) {
			return next(res.status(404).send('No student found'));
		}
		const batch = await findBatch(student.batch, student.branch);
		batch.branches.forEach((branch) => {
			if (branch.name === student.branch) {
				branch.totalStudents--;
				branch.availableIntake++;
			}
		});
		await batch.save();
		
		return res.status(200).send({ data: student });
	} catch (err) {
		return next(err);
	}
}

export async function addPresentAttendance(req, res, next) {
	const studentId = req.params.id;
	const presentAttendanceArray = req.body.presentAttendance;
	const absentAttendanceArray = req.body.absentAttendance;
	try {
		const student = await getStudentById(studentId);
		if (!student) {
			return next(res.status(404).send('No student found'));
		}
		presentAttendanceArray.forEach((date) => {
			if (
				new Date(date).getDay() === 6 ||
				new Date(date).getDay() === 0 ||
				student.attended.includes(new Date(date).toString())
			) {
				return;
			}
			student.attended.push(new Date(date).toString());
		});
		absentAttendanceArray.forEach((date) => {
			if (
				new Date(date).getDay() === 6 ||
				new Date(date).getDay() === 0 ||
				student.notAttended.includes(new Date(date).toString())
			) {
				return;
			}
			student.notAttended.push(new Date(date).toString());
		});
		await student.save();

		return res.status(200).send({ data: student });
	} catch (err) {
		return next(err);
	}
}

export async function findAbsentStudents(req, res, next) {
	const date = req.params.date;
	try {
		const absentStudents = await findAllAbsentStudents(
			new Date(date).toString(),
		);

		return res.status(200).send({ data: absentStudents });
	} catch (err) {
		return next(err);
	}
}

export async function findBranchAbsentees(req, res, next) {
	const date = req.query.date;
	const batch = req.query.batch;
	const branch = req.query.branch;
	const currentSemester = req.query.currentSemester;
	try {
		const absentStudents = await findBranchAbsentStudents(
			batch,
			branch,
			currentSemester,
			new Date(date).toString(),
		);
		return res.status(200).send({ data: absentStudents });
	} catch (err) {
		return next(err);
	}
}

export async function findLowAttendees(req, res, next) {
	const value = parseInt(req.query.value);
	const batch = req.query.batch;
	const branch = req.query.branch;
	const currentSemester = req.query.currentSemester;
	try {
		const absentStudents = await findLowattendenceStudents(
			batch,
			branch,
			currentSemester,
			value,
		);
		return res.status(200).send({ data: absentStudents });
	} catch (err) {
		return next(err);
	}
}
