import { config } from 'dotenv';

config();

export const devConfig = {
  dbURL: process.env.MONGO_URL,
};
