import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import Handlebars from 'handlebars';
import {readFile} from "node:fs/promises";
import {resolve} from "node:path";

import User from '../db/models/User.js';
import Session from '../db/models/Session.js';

import { createSession, setSessionCookies } from '../services/auth.js';
import sendEmail from "../services/sendEmail.js";

const {FRONTEND_DOMAIN, JWT_SECRET} = process.env;

const verifyEmailTemplatePath = resolve("src", "templates", "verify-email.html");

export const regiserUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});

  const templateSource = await readFile(verifyEmailTemplatePath, "utf-8");
  const template = Handlebars.compile(templateSource);
  const html = template({
    username: newUser.username,
    link: `${FRONTEND_DOMAIN}/auth/register?token=${token}`
  })

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html,
  };

  await sendEmail(verifyEmail);

  // const session = await createSession(newUser._id);
  // setSessionCookies(res, session);

  res.status(201).json(newUser);
};

export const verifyUser = async(req, res)=> {
  const {token} = req.body;
  try {
    const {id, email} = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({_id: id, email});
    if(!user) {
      throw createHttpError(401, "User not found");
    }
    if(user.verify) {
      throw createHttpError(401, "User already verified");
    }

    user.verify = true;
    await user.save();

    res.json({
      message: "Email verify successfully"
    })
  }
  catch(error) {
    throw createHttpError(401, error.message);
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  if(!user.verify) {
    throw createHttpError(401, 'Email not verified');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: user._id });

  const session = await createSession(user._id);
  setSessionCookies(res, session);

  res.json(user);
};

export const refreshUserSession = async (req, res) => {
  const { sessionId } = req.cookies;
  const session = await Session.findOne({
    _id: sessionId,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  await Session.deleteOne({ _id: sessionId });
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.json({
    message: 'Session refreshed',
  });
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
