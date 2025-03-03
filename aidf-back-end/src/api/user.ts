import express from "express";
import { createUser, getAllUsers } from "../application/user";

const usersRouter = express.Router();

usersRouter.route("/").post(createUser).get(getAllUsers);

export default usersRouter;
