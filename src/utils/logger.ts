// create a singleton logger with winstone

import { createLogger, format, transports } from 'winston';

const logger = () => {
  const customLogger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
        )
      }),
      new transports.File({ filename: `${Date.now()}.log`, dirname: 'logs' })
    ]
  });

  const log = (message: string, ...args: any[]) => {
    customLogger.info(message, args);
  };

  const warn = (message: string, ...args: any[]) => {
    customLogger.warn(message, args);
  };

  const error = (message: string, ...args: any[]) => {
    customLogger.error(message, args);
  };

  const debug = (message: string, ...args: any[]) => {
    customLogger.debug(message, args);
  };

  return {
    log,
    warn,
    error,
    debug
  };
};

export default logger();
