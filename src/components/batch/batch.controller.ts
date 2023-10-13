import {
	createNewBatch,
	findAllBatches,
	findSeatVacantDetails,
} from './batch.DAL';

export async function createBatch(req, res, next) {
	try {
		const batchObject = req.body;

		if (!batchObject.year || !batchObject.branches) {
			return next(res.status(404).send('Incomplete data to create batch'));
		}

		const batch = await createNewBatch(batchObject);
		
		return res.status(200).send({ data: batch });
	} catch (err) {
		return next(err);
	}
}

export async function getAllBatches(req, res, next) {
	try {
		const batches = await findAllBatches();
		return res.status(200).send({ data: batches });
	} catch (err) {
		return next(err);
	}
}


export async function vacantSeatDetails(req, res, next) {
	try {
		const batch = await findSeatVacantDetails(req.params.year);
		if (!batch) {
			return next(res.status(404).send('BATCH NOT FOUND'));
		}

		let totalStudents = 0;
		let totalStudentsIntake = 0;

		batch.branches.forEach(function(branch) {
			totalStudents += branch.totalStudents;
			totalStudentsIntake += branch.totalStudentsIntake;
		});
		
		batch.totalStudentsIntake = totalStudentsIntake;
		batch.totalStudents = totalStudents;
		batch.availableIntake = batch.totalSeats - totalStudents;
		
		return res.status(200).send({ data: batch });
	} catch (err) {
		return next(err);
	}
}
