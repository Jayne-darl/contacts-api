import mongoose from 'mongoose';
import appConfig from '../config';

export const connect = async () => {
  try {
    await mongoose.connect(appConfig.dbURL);

    const db = mongoose.connection;

    return db;
  } catch (error) {
    throw new Error(error);
  }
};
