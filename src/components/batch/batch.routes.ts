import { Router } from 'express';
import authorization from '../../utils/auth';
// import { createBatch,getAllBatches,vacantSeatDetails } from './batch.controller';
const authRoles = require('../../utils/authRole');

class BatchRoute {
	public router: Router;

	constructor() {
		this.router = Router();
		// this.initializeRoutes();
	}

	// initializeRoutes() {
	// 	// Create a new Batch
	// 	this.router.post('/newbatch',authorization,authRoles('admin'),createBatch,);
		
	// 	// Get all batches
	// 	this.router.get('/', authorization, getAllBatches);

	// 	// Get vacant seat details for a batch
	// 	this.router.get('/:year',authorization,vacantSeatDetails);
	// }
}

export default new BatchRoute().router;
