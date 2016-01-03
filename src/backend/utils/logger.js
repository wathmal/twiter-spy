/**
 * Created by wathmal on 12/12/15.
 */
import winston from 'winston';
import config from './../config';

let logger = new winston.Logger({
    // level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: config.logfile })
    ]
});

export default logger;
