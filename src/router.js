import { Router } from 'express';
import contactRouter from './resources/contact/contact.router';

const testRouter = Router();

testRouter.all('/', (_, res) => res.json({ message: 'Welcome to Contacts App' }));

const appRouter = [testRouter, contactRouter];

export default appRouter;
