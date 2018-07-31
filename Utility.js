const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const basicConfig = require('./basicConfig');

let uitilityMethods = {};

// set enviornment for nodejs app
const NODE_ENV = basicConfig.env_config.node_env

// use logger for nodejs process to add logs in file using winston transports

// setting up transports for winston
const errorTransport = new transports.File({ filename: 'logs/error.log', level: 'error'});
const infoTransport = new transports.File({ filename: 'logs/combined.log'});
const consoleTransport = new transports.Console();

const myFormat = printf(info => {
  return `${info.timestamp}: ${info.level}: ${info.message}`;
});

//{format: winston.format.simple()}
let logger = createLogger({
	format: combine(
		timestamp(),
		myFormat),
	// format: winston.format.json(),
	// - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    transports:[errorTransport, infoTransport]
});

// console log on the stdout in case of developement env.
if (NODE_ENV !== 'production') {
	logger.remove(errorTransport);
	logger.remove(infoTransport);
	logger.add(consoleTransport);
}


uitilityMethods.log = function(loggingMode, msg){
	logger.log({
  		level: loggingMode,  // Level of the logging message  
  		message: msg // Descriptive message being logged.
  	});
}


module.exports = uitilityMethods;