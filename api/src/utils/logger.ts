import * as path from 'path';
import * as fs from 'fs';
import { createLogger, format, transports, addColors } from 'winston';

const logDirectory = path.resolve(__dirname, '../../logs');

try {
  // Verifica y crea recursivamente el directorio de logs
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }
} catch (err) {
  console.error(`Error al crear el directorio de logs: ${err.message}`);
}
// Configuración de niveles y colores personalizados
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'pink',
  },
};

addColors(customLevels.colors);

// Configuración del logger Winston
const logger = createLogger({
  levels: customLevels.levels,
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
    }),
    new transports.File({ filename: path.join(logDirectory, 'combined.log') }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    }),
  ],
});

export default logger;
