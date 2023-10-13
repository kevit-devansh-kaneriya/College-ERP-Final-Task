const Batch = require('./batch.model');

/**
 * Creates new Batch in DB
 * @param batchBody => Batch Object to be created.
 */

export async function createNewBatch(batchBody) {
	try {
		return await Batch.create(batchBody);
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'Batch already exist or Invalid data.'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * Get all batches from DB
 */
export async function findAllBatches() {
	try {
		return await Batch.aggregate([
			{
				$unwind: '$branches',
			},
			{
				$group: {
					_id: '$year',
					totalStudents: { $sum: '$branches.totalStudents' },
					branches: {
						$push: {
							k: '$branches.name',
							v: '$branches.totalStudents',
						},
					},
				},
			},
			{
				$group: {
					_id: '$_id',
					totalStudents: { $first: '$totalStudents' },
					branches: { $push: { $arrayToObject: '$branches' } },
				},
			},
			{
				$project: {
					year: '$_id',
					_id: 0,
					totalStudents: 1,
					branches: 1,
				},
			},
		]);
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'UNHANDLED PROMISE ERROR'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * Get vacant seat details as per year requested
 * @param year => Year to to get vacant seat datails.
 */

export async function findSeatVacantDetails(year) {
	try {
		return await Batch.findOne({ year }).lean();
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'UNHANDLED PROMISE ERROR'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}

/**
 * find a batch using year
 * @param year => Year to to get batch.
 * @param branch => branch of the batch.
 */

export async function findBatch(year, branch) {
	try {
		return await Batch.findOne({ year, 'branches.name': branch });
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'BATCH OR BRANCH NOT AVAILABLE'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
}
