import { LogLevel } from '../enums';
import { LoggerServiceOptions } from '../interfaces';

export class LoggerService {
    private logLevel: LogLevel;
    
    constructor(options?: LoggerServiceOptions) {
      if (options.logLevel) {
        this.logLevel = options.logLevel;
      } else {
        this.logLevel = process.env.LOGGER_LOG_LEVEL | LogLevel.DEBUG;
      }
    }

    public debug(message: string) {
      if (this.logLevel === LogLevel.DEBUG) {
        console.log(`DEBUG >> ${new Date().toUTCString()}: ${message}`);
      }
    };
    
    public info(message: string) {
      if (this.logLevel === LogLevel.INFO || this.logLevel === LogLevel.DEBUG) {
        console.log(`INFO >> ${new Date().toUTCString()}: ${message}`);
      }
    };

    public error(error: Error) {
      if (this.logLevel === LogLevel.INFO || this.logLevel === LogLevel.DEBUG || this.logLevel === LogLevel.ERROR) {
        console.log(`ERROR >> ${new Date().toUTCString()}: ${error.message}`);
        console.error(error);
      }
    }
}
