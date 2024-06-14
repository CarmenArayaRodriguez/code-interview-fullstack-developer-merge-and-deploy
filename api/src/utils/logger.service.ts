import { LoggerService, Injectable } from '@nestjs/common';
import logger from './logger';

@Injectable()
export class CustomLoggerService implements LoggerService {
  log(message: string, ...optionalParams: any[]) {
    logger.info(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    logger.error(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    logger.warn(message, ...optionalParams);
  }

  debug?(message: string, ...optionalParams: any[]) {
    logger.debug(message, ...optionalParams);
  }

  verbose?(message: string, ...optionalParams: any[]) {
    logger.verbose(message, ...optionalParams);
  }
}
