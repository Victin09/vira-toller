import express, { Express, Request, Response, json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import https from 'https';
import fs from 'fs';

import logger from './config/logger.config';
import passport from './config/passport.config';
import runDatabase from './config/db.config';
import router from './routes/router';
import bearer from './middlewares/bearer.middleware';
import morganMiddleware from './middlewares/morgan.middleware';

// App
const app: Express = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());
app.use(bearer);
app.use(passport.initialize());
app.use(morganMiddleware);

// API
app.get('/', passport.authenticate('jwt', { session: false }), (_req: Request, res: Response) => {
  return res.status(200).send({
    success: true,
    message: 'API run correctly',
  });
});

app.use('/api/v1', router);

const privateKey: string = fs.readFileSync('SSL/server.key', 'utf8');
const certificate: string = fs.readFileSync('SSL/server.crt', 'utf8');

// App
const port: number | string = process.env.PORT || 5000;

// Server
const credentials: https.ServerOptions = { key: privateKey, cert: certificate };
const HTTPS = https.createServer(credentials, app);
const httpsDev = Boolean(process.env.HTTPS_DEV);

let server: Express | https.Server;
process.env.NODE_ENV === 'production' ? (server = app) : httpsDev ? (server = HTTPS) : (server = app);

const runServer = (): void => {
  server.listen(port, async () => {
    try {
      await runDatabase();
      logger.info(`${httpsDev ? `SSL dev server` : `Web server`} listening on port ${port}`);
    } catch (err) {
      logger.error('Error to connect server ', err);
      process.exit(1);
    }
  });
};

export default runServer;
