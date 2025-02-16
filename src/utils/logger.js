const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const logDir = 'logs';
fs.mkdirSync(logDir, { recursive: true });

const errorLogFile = path.join(logDir, 'error.log');
const combinedLogFile = path.join(logDir, 'combined.log');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json() // Use JSON format for structured logging
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, stack }) => {
          return `${timestamp} [${level}]: ${stack || message}`;
        })
      )
    }),
    new transports.File({
      filename: errorLogFile,
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: combinedLogFile,
      format: format.combine(format.timestamp(), format.json())
    })
  ],
});

const httpLogStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

morgan.format('myFormat', (tokens, req, res) => {
  const getUserInfo = () => {
    try {
      const userId = req.kauth?.grant?.access_token?.content?.sub || 'anonymous';
      const username = req.kauth?.grant?.access_token?.content?.preferred_username || 'anonymous';
      return { id: userId, name: username };
    } catch (error) {
      return { id: 'anonymous', name: 'anonymous' };
    }
  };

  const userInfo = getUserInfo();
  const responseTime = tokens['response-time'](req, res);

  const logObject = {
    timestamp: new Date().toISOString(),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    'content-length': tokens.res(req, res, 'content-length'),
    'response-time': `${responseTime}ms`,
    user_id: userInfo.id,
    username: userInfo.name,
    ip: req.ip, // Correctly get IP address
    message: `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)}`,
  };

  return JSON.stringify(logObject);
});

const morganFormat = 'myFormat';

const httpLogger = morgan(morganFormat, { stream: httpLogStream });

module.exports = { logger, httpLogger };