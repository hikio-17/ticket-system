const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const logger = require('../logger');

jest.mock('winston');
jest.mock('winston-daily-rotate-file');

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create logger with correct options', () => {
    expect(winston.createLogger).toHaveBeenCalledWith({
      transports: [
        new DailyRotateFile({
          level: 'info',
          dirname: expect.stringContaining('/logs'),
          filename: 'app.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          handleExceptions: true,
          maxsize: '5m',
          maxFiles: '7d',
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
        }),
      ],
      exitOnError: false,
    });
  });

  it('should write log message using logger.stream', () => {
    const logMessage = 'Test log message';
    const writeFn = logger.stream.write;

    writeFn(logMessage, 'utf8');

    expect(logger.info).toHaveBeenCalledWith(logMessage);
  });
});