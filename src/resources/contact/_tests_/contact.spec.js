/* eslint-disable no-undef */
import mongoose from 'mongoose';
import request from 'supertest';
import { ROUTES } from '../routes';
import app from '../../../server';

import { Contact } from '../contact.model';

let contact;
beforeAll(async () => {
  contact = await Contact.create({
    firstName: 'nneky',
    lastName: 'winifred',
    email: 'winny@mail.com',
    phoneNumber: '08065678000',
  });
});

it('Testing to see if jest works', () => {
  expect(1).toBe(1);
});

const BASE_URL = '/api/v1';

describe('create contact', () => {
  test('create a new contact', async () => {
    const body = {
      firstName: 'nneky',
      lastName: 'Amadi',
      email: 'neka@mail.com',
      phoneNumber: '08065678970',
    };
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.CONTACT}`)
      .send(body);

    expect(response.statusCode).toBe(201);
    expect(response.body.data.firstName).toEqual(body.firstName);
  });

  test('validates formdata', async () => {
    const body = {
      firstName: 'nneky',
      phoneNumber: '08065678970',
    };
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.CONTACT}`)
      .send(body);

    expect(response.statusCode).toBe(422);
  });

  test('return error message if phonenumber already exist', async () => {
    const body = {
      firstName: 'nneky',
      lastName: 'winifred',
      email: 'josh@mail.com',
      phoneNumber: '08065678000',
    };
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.CONTACT}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('Contact already exist');
  });

  test('return error message if email is already taken', async () => {
    const body = {
      firstName: 'nneky',
      lastName: 'winifred',
      email: 'winny@mail.com',
      phoneNumber: '08065678009',
    };
    const response = await request(app)
      .post(`${BASE_URL}${ROUTES.CONTACT}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('Contact with email already exist');
  });
});

describe('edit a contact', () => {
  test('it returns an error when contact doesn\'t exist', async () => {
    const id = mongoose.Types.ObjectId;
    const body = { lastName: 'Talia' };

    const response = await request(app)
      .patch(`${BASE_URL}${ROUTES.CONTACT}/${String(id)}`)
      .send(body);

    expect(response.statusCode).toBe(404);
  });

  test('it updates the contact that exist', async () => {
    const body = { lastName: 'Talia' };

    const response = await request(app)
      .patch(`${BASE_URL}${ROUTES.CONTACT}/${String(contact._id)}`)
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Contact updated');
  });
});

describe('get all contact', () => {
  test('it returns all contact in db', async () => {
    const response = await request(app)
      .get(`${BASE_URL}${ROUTES.CONTACT}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(2);
  });
});

describe('get a contact', () => {
  test('it returns the contact', async () => {
    const response = await request(app)
      .get(`${BASE_URL}${ROUTES.CONTACT}/${String(contact._id)}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.editHistory).toBeTruthy();
  });

  test('it returns error if the contact doesn\'t exist', async () => {
    const id = mongoose.Types.ObjectId;
    const response = await request(app)
      .get(`${BASE_URL}${ROUTES.CONTACT}/${id}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('delete a contact', () => {
  test('it deletes the contact', async () => {
    const response = await request(app)
      .delete(`${BASE_URL}${ROUTES.CONTACT}/${String(contact._id)}`);

    expect(response.statusCode).toBe(200);
  });

  test('it returns 404 if the contact doesn\'t exist', async () => {
    const response = await request(app)
      .delete(`${BASE_URL}${ROUTES.CONTACT}/${String(contact._id)}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('No contact found');
  });
});
