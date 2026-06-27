/**
 * Unified Logging Utility
 * Use this to track application flow and pinpoint failures.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: any;
  timestamp: string;
}

const log = (level: LogLevel, message: string, context?: any) => {
  const entry: LogEntry = {
    level,
    message,
    context,
    timestamp: new Date().toISOString(),
  };

  const formattedMessage = `[${entry.timestamp}] [${level.toUpperCase()}]: ${message}`;

  switch (level) {
    case 'info':
      console.info(formattedMessage, context ? context : '');
      break;
    case 'warn':
      console.warn(formattedMessage, context ? context : '');
      break;
    case 'error':
      console.error(formattedMessage, context ? context : '');
      break;
    case 'debug':
      console.debug(formattedMessage, context ? context : '');
      break;
  }
};

export const logger = {
  info: (message: string, context?: any) => log('info', message, context),
  warn: (message: string, context?: any) => log('warn', message, context),
  error: (message: string, context?: any) => log('error', message, context),
  debug: (message: string, context?: any) => log('debug', message, context),
};