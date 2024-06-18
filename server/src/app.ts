import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import timeout from 'connect-timeout';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import CONFIG from './config';
import { expressPinoLogger } from './helpers';
import MongoDB from './db/database';
import { swaggerSpec } from './swagger';
import * as errorHandler from '@/middlewares/errorHandler';
import routes from '@/routes';

export const createApp = async (): Promise<Application> => {
  const app = express();
  const db = await MongoDB.connectDB();

  app.locals.db = db;

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(express.urlencoded({ extended: true }));

  if (CONFIG.APP.ENV !== 'test') {
    app.use(morgan('dev'));
    app.use(expressPinoLogger());
  }

  app.use(timeout(CONFIG.SERVER.TIMEOUT));

  // API Routes
  app.use(`/api/${CONFIG.APP.VER}`, routes);

  // Error Middleware
  app.use(errorHandler.genericErrorHandler);
  app.use(errorHandler.notFoundError);

  return app;
};
