import { Router } from 'express';
import authorization from '../../utils/auth';
import { 
	createAdmin ,
	loginUser ,
	createStaff ,
	getUsers ,
	deleteUser ,
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

		// Create a new staff account
		this.router.post('/staff',authorization,authRoles('admin'),createStaff,);

		// List Users
		this.router.get('/', authorization, getUsers);

		// Delete User
		this.router.delete('/delete',authorization,deleteUser);

		// Logout User
		this.router.put('/logout',authorization,logoutUser);

		// Logout User from all devices
		this.router.put('/logoutAll',authorization,logoutUserFromAll);
	}
}

export default new UsersRoute().router;
