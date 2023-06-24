import winston, { format } from 'winston'
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'

// custom log format
const myFormat = format.printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${date} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: 'Project Name!' }),
    format.timestamp(),
    myFormat,
    format.prettyPrint()
  ),

  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'success',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
const errorLogger = winston.createLogger({
  level: 'error',
  format: format.combine(
    format.label({ label: 'Project Name!' }),
    format.timestamp(),
    myFormat,
    format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'error', 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1m',
    }),
  ],
})

export { logger, errorLogger }
