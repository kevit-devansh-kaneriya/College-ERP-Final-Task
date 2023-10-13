import { Router } from 'express';
import authorization from '../../utils/auth';
import { createAdmin,loginUser,createStaff,getUsers,updateUser,getMyProfile,getUserProfileById,deleteUser,logoutUser,logoutUserFromAll} from './user.controller';
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

		// Update User
		this.router.patch('/update',authorization,updateUser);

		// Get a User
		this.router.get('/me', authorization, getMyProfile);

		// Get User by Id
		this.router.get('/:id',authorization,getUserProfileById);

		// Delete User
		this.router.delete('/delete',authorization,deleteUser);

		// Logout User
		this.router.put('/logout',authorization,logoutUser);

		// Logout User from all devices
		this.router.put('/logoutAll',authorization,logoutUserFromAll);
	}
}

export default new UsersRoute().router;
