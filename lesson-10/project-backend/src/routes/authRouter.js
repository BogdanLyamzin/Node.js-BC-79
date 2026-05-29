import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserSchema,
  verifyTokenSchema,
  loginUserSchema,
} from '../validation/authValidation.js';

import {
  regiserUser,
  verifyUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authControllers.js';

const authRouter = Router();

authRouter.post('/register', celebrate(registerUserSchema), regiserUser);

authRouter.post('/verify', celebrate(verifyTokenSchema), verifyUser);

authRouter.post('/login', celebrate(loginUserSchema), loginUser);

authRouter.post('/refresh', refreshUserSession);

authRouter.post('/logout', logoutUser);

export default authRouter;
