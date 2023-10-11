"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.morganInstance = void 0;
const winston_1 = require("winston");
const winston_channel_logger_1 = require("@kevit/winston-channel-logger");
const morgan = require("morgan");
const config_1 = require("../config");
const winstonChannelLogger = new winston_channel_logger_1.WinstonChannelLogger({
    format: winston_1.format.uncolorize(),
    level: 'warn',
    platforms: [{
            webhookUrl: process.env.WEBHOOKURL,
            token: null,
            platformName: 'ms-teams',
            channelId: null
        }],
});
const logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.Console({ level: 'silly' }), winstonChannelLogger],
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.colorize(), winston_1.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })),
});
const morganformat = config_1.default.server.env === 'dev'
    ? 'dev'
    : ':remote-addr ":user-agent" - :method :url :status :response-time ms - :res[content-length]';
exports.morganInstance = morgan(morganformat, {
    stream: {
        write: (str) => {
            if (str && str.split('?')[1]) {
                if (str.split('?')[1].split('=')[0] !== 'watermark') {
                    logger.debug(str);
                }
            }
            else {
                logger.debug(str);
            }
        },
    },
});
exports.log = logger;
//# sourceMappingURL=winston-logger.js.map