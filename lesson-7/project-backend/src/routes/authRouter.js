import { Router } from "express";
import { celebrate } from "celebrate";

import { registerUserSchema, loginUserSchema } from "../validation/authValidation.js";

import { regiserUser, loginUser, logoutUser } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/register", celebrate(registerUserSchema), regiserUser);

authRouter.post("/login", celebrate(loginUserSchema), loginUser);

authRouter.post("/logout", logoutUser);

export default authRouter;
