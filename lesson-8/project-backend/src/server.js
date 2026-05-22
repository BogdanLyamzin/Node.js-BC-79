import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import 'dotenv/config';

import logger from './middlewares/logger.js';
import NotFoundHandler from './middlewares/NotFoundHandler.js';
import ErrorHandler from './middlewares/ErrorHandler.js';

import authRouter from './routes/authRouter.js';
import contactsRouter from './routes/contactsRouter.js';

import connectDatabase from './db/connectDatabase.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(logger);

app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);

app.use(NotFoundHandler);
app.use(errors());
app.use(ErrorHandler);

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running on 3000 port`));
