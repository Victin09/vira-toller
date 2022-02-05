import express, { Express, Request, Response, json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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

runDatabase();

export default app;
