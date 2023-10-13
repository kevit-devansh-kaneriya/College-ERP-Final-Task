import { findBatch } from '../batch/batch.DAL';
import {
	addStudentInDB
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