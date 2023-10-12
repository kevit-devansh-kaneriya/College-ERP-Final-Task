import { Router } from 'express';
import authorization from '../../utils/auth';
import { 
	createAdmin ,
	loginUser ,
	logoutUser ,
	logoutUserFromAll
} from './user.controller';

const authRoles = require('../../utils/authRole');

class UsersRoute {
	public router: Router;

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		// Sign Up
		this.router.post('/signup', createAdmin);

		// Login User
		this.router.post('/login', loginUser);

		// Logout User
		this.router.put('/logout',authorization,logoutUser);

		// Logout User from all devices
		this.router.put('/logoutAll',authorization,logoutUserFromAll);
	}
}

export default new UsersRoute().router;
