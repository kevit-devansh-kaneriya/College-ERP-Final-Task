import { Application } from 'express';
// import OrganizationRoutes from './components/organization/organization.routes';
import UserRoutes from './components/user/user.routes';
import BatchRoutes from './components/batch/batch.routes';
import StudentRoutes from './components/student/student.routes';
import IndexRoute from './index';

export default class ApplicationConfig {
	public static registerRoute(app: Application) {
		app.use('/', IndexRoute);
		app.use('/users', UserRoutes);
		app.use('/batches', BatchRoutes);
		app.use('/students', StudentRoutes);
	}
}
