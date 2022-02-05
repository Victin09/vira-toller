import dotenv from 'dotenv';
import https from 'https';
import { Express } from 'express';
import fs from 'fs';

dotenv.config();

const privateKey: string = fs.readFileSync('SSL/server.key', 'utf8');
const certificate: string = fs.readFileSync('SSL/server.crt', 'utf8');

// App
import app from './app';
import logger from './config/logger.config';
const port: number | string = process.env.PORT || 5000;

// Server
const credentials: https.ServerOptions = { key: privateKey, cert: certificate };
const HTTPS = https.createServer(credentials, app);
const httpsDev = Boolean(process.env.HTTPS_DEV);

let server: Express | https.Server;
process.env.NODE_ENV === 'production' ? (server = app) : httpsDev ? (server = HTTPS) : (server = app);

server.listen(port, () => {
  try {
    logger.info(`${httpsDev ? `SSL dev server` : `Web server`} listening on port ${port}`);
  } catch (err) {
    logger.error('Error to connect server ', err);
    process.exit(1);
  }
});
