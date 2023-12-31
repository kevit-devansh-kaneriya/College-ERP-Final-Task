/* eslint-disable import/first */
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';

dotenv.config();
import ApplicationConfig from './application.routes';
import Config from './config';

const mongoUrl: string = Config.mongodb.url;
const PORT: string | number = Config.server.port;
class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		const server = http.createServer(this.app);
		server.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
		this.config();
		this.mongoSetup();
	}

	private config(): void {
		this.app.use(cookieParser());
		this.app.use(
			cors({
				origin: true,
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
				allowedHeaders: [
					'Origin',
					' X-Requested-With',
					' Content-Type',
					' Accept ',
					' Authorization',
					'x-ms-bot-agent',
					'User-Agent',
				],
				credentials: true,
			}),
		);
		this.app.use(bodyParser.json({ limit: '50mb' }));
		this.app.use(
			bodyParser.urlencoded({
				limit: '50mb',
				extended: true,
				parameterLimit: 50000,
			}),
		);
		
		ApplicationConfig.registerRoute(this.app);

		// Start static serving.
		this.app.use(express.static('public'));

		/**
		 * Catch 404 routes
		 */
		this.app.use((req, res, next) => {
			const err: any = new Error('Not Found');
			err.status = 404;
			next(err);
		});

		/**
		 * Error Handler
		 */
		this.app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.json(err);
		});
	}

	/**
	 * Establishes MongoDB connection
	 */
	private mongoSetup(): void {
		mongoose.connection.on('connected', () => {
			console.log('DATABASE - Connected');
		});

		mongoose.connection.on('error', (err) => {
			console.log(`DATABASE - Error:${err}`);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('DATABASE - disconnected  Retrying....');
		});

		const dbOptions = {
			maxPoolSize: 5,
			useNewUrlParser: true,
		};
		mongoose.connect(mongoUrl, dbOptions);
	}
}

// Start Application.
new App();
