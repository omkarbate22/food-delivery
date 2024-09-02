import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js"; // Make sure to include the .js extension

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
