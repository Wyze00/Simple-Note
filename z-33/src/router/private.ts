import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";


export const privateAPI = express.Router();

privateAPI.use(authMiddleware);

privateAPI.get('/api/users', UserController.get);
privateAPI.patch('/api/users', UserController.update);
privateAPI.delete('/api/users', UserController.logout);