import { Router } from 'express';
import authorization from '../../utils/auth';
import {addStudent,
	getStudent,
	updateBranchOrBatch,
	updateStudentInfo,
	deleteStudent,
	addPresentAttendance,
	findAbsentStudents,
	findBranchAbsentees,
	findLowAttendees} from './student.controller';
const authRoles = require('../../utils/authRole');

class StudentRoutes {
	public router: Router;
	
	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		// Create a new student
		this.router.post('/addStudent',authorization,authRoles('admin', 'staff'),addStudent);

		// Read a student
		this.router.get('/:id',authorization,authRoles('admin', 'staff'),getStudent);

		// Update batch or branch of student
		this.router.patch('/updatebatch/:id',authorization,authRoles('admin', 'staff'),updateBranchOrBatch);

		// Update student's info
		this.router.patch('/updateinfo/:id',authorization,authRoles('admin', 'staff'),updateStudentInfo);

		// Delete a student.
		this.router.delete('/:id',authorization,authRoles('admin', 'staff'),deleteStudent);

		// Add a student attendance.
		this.router.patch('/attendence/:id',authorization,authRoles('admin', 'staff'),addPresentAttendance);

		// find all absent students.
		this.router.get('/allabsentstudents/:date',authorization,authRoles('admin', 'staff'),findAbsentStudents);

		// find absent students from a perticular batch, branch etc.
		this.router.get('/branchabsentees/find',authorization,authRoles('admin', 'staff'),findBranchAbsentees);

		// find students with attendance less than a value, from a perticular branch.
		this.router.get('/lessattendence/find',authorization,authRoles('admin', 'staff'),findLowAttendees);
	}
}

export default new StudentRoutes().router;
