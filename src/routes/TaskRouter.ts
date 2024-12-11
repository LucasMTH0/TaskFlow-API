import * as TasksController from '../controllers/tasks';
import { Router } from "express";
const taskRouter = Router()

taskRouter.post('/task', TasksController.createTask);
taskRouter.get('/task/:id', TasksController.getUniqueTask);
taskRouter.get('/tasks/:id', TasksController.getAllTasks);
taskRouter.put('/task/:id', TasksController.updateTask);
taskRouter.delete('/task/:id', TasksController.deleteTask);

export { taskRouter }