/* eslint-disable no-console */
import { isProduction } from './env';

class Logger {
  static debugEnabled = !isProduction() && process.env.DEBUG_LOG === 'true';
  public debug(message: string, ...args: Array<unknown>) {
    if (Logger.debugEnabled) {
      console.debug(message, ...args);
    }
  }
  public info(message: string, ...args: Array<unknown>) {
    console.info(message, ...args);
  }
  public error(message: string, ...args: Array<unknown>) {
    console.error(message, ...args);
  }
}

const log = new Logger();

export { log };
