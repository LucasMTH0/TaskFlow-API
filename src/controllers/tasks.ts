
import { Request, Response, } from "express";
import { Task } from "../types/Task";
import { database } from "../database/databaseConfig";
import { ApiError } from "../helpers/api-errors";


export function createTask(request: Request, response: Response){
    const { title, description, done, dateLimit, createdAt, userID } = request.body
    const query: string = "INSERT INTO tasks (title, description, done, dateLimit, createdAt, userID) values (?,?,?,?,?,?)"
    const values: string[] = [
        title, 
        description, 
        done,
        new Date(dateLimit).toISOString(), 
        new Date(createdAt).toISOString(), 
        parseInt(userID)
    ]
    database.all(query, values, (createTaskError: Error) => {
        if( createTaskError ){
            return response.status(400).send({ error: "Erro ao cadastrar", details: createTaskError.message });
            //throw new ApiError("Erro ao cadastrar", 400)
        }
        return response.status(201).send({message: "Tarefa criada com sucesso!"})
    })
}
export function getAllTasks(request: Request, response: Response){
    const {id} = request.params
    console.log("params: ", parseInt(id))
    const query: string = "SELECT * FROM tasks WHERE userID = ?";
    const value = [id];
    database.all(query, value, 
        (getTasksError: Error, tasks: any) => {
            if(getTasksError){
                console.log(getTasksError.message)
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
    database.get(query, value, (errorIDNotFound: Error, task: any) => {
        if(errorIDNotFound){
            throw new ApiError("Erro ao buscar tarefa.", 404);
        }
        response.status(200).send(params.id);
    })
}
export function updateTask(request: Request, response: Response){
    const { id } = request.params
    const { title, description, dateLimit, done } = request.body
    const query: string = "UPDATE tasks SET title = ? , description = ?, dateLimit = ?, done = ? WHERE id = ?"
    const values: string[] = [ title, description, dateLimit, done, id ]
        database.run(query, values, (updateTaskError: Error, task: Task) => {
        if( updateTaskError ){
            return response.status(400).send({ error: "Erro ao atualizar", details: updateTaskError.message });
            throw new ApiError("Erro ao atualizar tarefa.", 400);
        }
        return response.status(201).send({message: "Tarefa alterada com sucesso!"})
    })
}
export function deleteTask(request: Request, response: Response) {
    const { params } = request;
    const query: string = "DELETE FROM Tasks WHERE id = ?"
    const values: string[] = [params.id];
    database.run(query, values, (error: Error, result: any)=> {
        if(error){
            throw new ApiError("Erro ao deletar tarefa.", 400)
        }
        response.status(200).send(params.id)
    })     
}