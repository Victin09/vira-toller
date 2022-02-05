import { ConnectOptions, connect } from 'mongoose';

import logger from './logger.config';

const MONGODB_URI: string = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}` : `mongodb://${process.env.DB_URL}:27017/${process.env.DB_NAME}`;

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

const databaseConnection = async () => {
  try {
    await connect(MONGODB_URI, connectOptions);
    logger.info(`Connected to DB`);
  } catch (err) {
    logger.error(`Error to connect DB`, err);
    process.exit(1);
  }
};

export default databaseConnection;
