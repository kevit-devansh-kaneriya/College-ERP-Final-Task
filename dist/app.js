"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();
const application_routes_1 = require("./application.routes");
const config_1 = require("./config");
const mongoUrl = config_1.default.mongodb.url;
const PORT = config_1.default.server.port;
class App {
    constructor() {
        this.app = express();
        const server = http.createServer(this.app);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        this.config();
        this.mongoSetup();
    }
    config() {
        this.app.use(cookieParser());
        this.app.use(cors({
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
        }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000,
        }));
        application_routes_1.default.registerRoute(this.app);
        this.app.use(express.static('public'));
        this.app.use((req, res, next) => {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json(err);
        });
    }
    mongoSetup() {
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
new App();
//# sourceMappingURL=app.js.map