enum LogLevel {
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

export class LoggerService {
    private logLevel: string;
    
    constructor() {
      this.logLevel = process.env.LOGGER_LOG_LEVEL | 'DEBUG';
    }

    public debug(message: string) {
      if (this.logLevel == LogLevel.DEBUG) {
        console.log(`DEBUG >> ${new Date().toUTCString()}: ${message}`);
      }
    };
    
    public info(message: string) {
      if (this.logLevel == LogLevel.INFO) {
        console.log(`INFO >> ${new Date().toUTCString()}: ${message}`);
      }
    };
}
