import express, { Application } from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv'
import morgan from 'morgan';
import createHttpError from 'http-errors';
import { logger, stream } from './utils/logger';
import initializeMongo from './config/mongodb.config';
import router from './routes';
import errorHandler from './middleware/errorHandler';

dotenv.config();
const PORT: number = +process.env.PORT! || 3000;
const ENV: string = process.env.NODE_ENV || 'development';

const app: Application = express();

// connect to mongo
initializeMongo();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev', { stream }))
app.use('/', router);
app.use(() => createHttpError(404, 'Route not found'))
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info('==================================');
  logger.info(`======= ENV: ${ENV} =========`);
  logger.info(` 🚀 App listening on the port ${PORT}  `);
  logger.info('==================================');
});

export default app;
