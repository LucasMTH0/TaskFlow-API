import { Router } from "express";
import * as UserController from '../controllers/users';

const userRouter = Router()

userRouter.get('/user/:email/:password', UserController.getUser);
userRouter.post('/user', UserController.createUser);
userRouter.put('/user/:id', UserController.updateUser);
userRouter.delete('/user/:id', UserController.deleteUser);

export { userRouter }