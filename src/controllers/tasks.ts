
import { Request, Response, } from "express";
import { Task } from "../types/Task";
import { database } from "../database/databaseConfig";
import { ApiError } from "../helpers/api-errors";


export function createTask(request: Request, response: Response){
    const { body } = request
    const query: string = "INSERT INTO tasks (title, description, done, term, createdAt) values (?,?,?,?,?)"
    const values: string[] = [body.title, body.description, body.done, body.term, body.createdAt]
    database.all(query, values, (createTaskError: Error, task: Task) => {
        if( createTaskError ){
            throw new ApiError("Erro ao cadastrar", 400)
        }
        return response.status(201).send({message: "Tarefa criada com sucesso!"})
    })
}
export function getAllTasks(request: Request, response: Response){
    const query: string = "SELECT * FROM tasks";
    const value: string[] = [];
    database.all(query, value, 
        (getTasksError: Error, tasks: Task[]) => {
            if(getTasksError){
                throw new ApiError("Erro ao carregar a lista de tarefas.", 404);
            }
            return response.status(200).send(tasks)
        }
    )
}
export function getUniqueTask(request: Request, response: Response) {
    const { params } = request;
    const query = "SELECT * FROM tasks WHERE id = ?"
    const value = [params.id]
    database.all(query, value, (errorIDNotFound: Error, task: any) => {
        if(errorIDNotFound){
            throw new ApiError("Erro ao buscar tarefa.", 404);
        }
        response.status(200).send(params.id);
    })
}
export function updateTask(request: Request, response: Response){
    const { params, body } = request;
    const query: string = "UPDATE tasks SET title = ? , description = ?, term = ?, done = ? WHERE id = ?"
    const values: string[] = [ body.title, body.description, body.term, body.done, params.id ]
        database.all(query, values, (createTaskError: Error, task: Task) => {
        if( createTaskError ){
            throw new ApiError("Erro ao atualizar tarefa.", 400);
        }
        return response.status(201).send({message: "Tarefa alterada com sucesso!"})
    })
}
export function deleteTask(request: Request, response: Response) {
    const { params } = request;
    const query: string = "DELETE FROM Tasks WHERE id = ?"
    const values: string[] = [params.id];
    database.all(query, values, (error: Error, result: any)=> {
        if(error){
            throw new ApiError("Erro ao deletar tarefa.", 400)
        }
        response.status(200).send(params.id)
    })     
}