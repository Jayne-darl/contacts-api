/* eslint-disable no-undef */
import mongoose from 'mongoose';

const url = process.env.MONGO_TEST_URL;

beforeEach((done) => {
  mongoose.connect(url, () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
afterAll((done) => done());
