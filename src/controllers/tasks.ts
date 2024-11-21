import { Request, Response, } from "express";
import { database } from "../databaseConfig";
import { Task } from "../types/Task";

export function createTask(request: Request, response: Response){
    const { body } = request
    const query: string = "INSERT INTO tasks (title, description, done, term, createdAt) values (?,?,?,?,?)"
    const values: string[] = [body.title, body.description, body.done, body.term, body.createdAt]
    database.all(query, values, (createTaskError: Error, task: any) => {
        if( createTaskError ){
            return response.status(500).send(createTaskError.message)
        }
        return response.send({message: "Tarefa criada com sucesso!"})
    })


}
export function getAllTasks(request: Request, response: Response){
    const query: string = "SELECT * FROM tasks";
    const value: string[] = [];
    database.all(query, value, 
        (getTasksError: Error, tasks: Task[]) => {
            if(getTasksError){
                return response.status(500).send({ message: "Ocorreu um erro ao conectar o banco de dados."})
            }
            return response.status(200).send(tasks)
        }
    )
}
export function getUniqueTask(request: Request, response: Response) {
    const { params } = request;
    const query = "SELECT * FROM tasks WHERE id = ?"
    const value = [params.id]
    database.all(query, value, (errorIDNotFound: any, task: any) => {
        response.status(200).send(params.id);
    })
}
export function updateTask(request: Request, response: Response){
    const { params, body } = request;
    const query: string = "UPDATE tasks SET title = ? , description = ?, term = ?, done = ? WHERE id = ?"
    const values: string[] = [ body.title, body.description, body.term, body.done, params.id ]
        database.all(query, values, (createTaskError: any, task: any) => {
        if( createTaskError ){
            return response.status(400).send({message: "Erro ao atualizar os dados.Tente novamente"})
        }
        return response.status(201).send({message: "Tarefa alterada com sucesso!"})
    })
    
}
export function deleteTask(request: Request, response: Response) {
    const { params } = request;
    const query: string = "DELETE FROM Tasks WHERE id = ?"
    const values: string[] = [params.id];
    database.all(query, values, (error: any, result: any)=> {
        response.status(200).send(params.id)
    })     
}