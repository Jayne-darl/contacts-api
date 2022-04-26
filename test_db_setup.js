/* eslint-disable no-undef */
import mongoose from 'mongoose';

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

export const setUp = async () => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url);
};

export const dropDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

export const dropCollections = async () => {
  if (mongo) {
    const { collections } = mongoose.connection;

    for (let i = 0; i < collections.length; i += 1) {
      const collection = collections[i];
      collection.deleteMany();
    }
  }
};

beforeAll(async () => {
  await setUp();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});
