import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const logger = createLogger({
  format: combine(
    timestamp(),
    printf(log => `${log.timestamp} [${log.level.toLocaleUpperCase()}] ${log.message}`)
  ),
  transports: [new transports.Console()]
});

export default logger;
