var cors = require('cors');
const express = require('express')
import { NextFunction, Request } from 'express';
import * as TasksController from './controllers/tasks';


const app = express()

app.use(cors())
app.use(express.json());

app.get('/tasks', TasksController.getAllTasks)
app.get('/task/:id', TasksController.getUniqueTask)
app.post('/task', TasksController.createTask)
app.delete('/task/:id', TasksController.deleteTask)
app.put('/task/:id', TasksController.updateTask)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    
})

app.listen("9990", () => {
    console.log("running in http://localhost:9990 !");
})