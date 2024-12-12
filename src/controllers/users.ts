import { Request, Response } from "express";
import { database } from "../database/databaseConfig";
import { ApiError } from "../helpers/api-errors";
import { checkUserPasswordToDatabaseEncryptedPassword, generateEncryptPassord } from "../helpers/bcrypt";
import { User } from "../types/User";


export async function createUser(request: Request, response: Response) {
    const {email, name, password, createdAt} = request.body
    const encryptedPassword = await generateEncryptPassord(password)

    const query: string = "INSERT INTO users(email, name, password, createdAt) VALUES (?,?,?,?)"
    const values: string[] = [email, name, encryptedPassword , createdAt]

    database.run(query, values, (createUserError: Error) => {
        if(createUserError){
            throw new ApiError("Este email já foi utilizado.", 400);
            return response.status(400).send("Este email já foi utilizado.")
        }
        return response.status(201).send("Cadastro realizado com sucesso!");
    })
}

export async function getUser(request: Request, response: Response){
    const {email, password} = request.params
    const query: string = "SELECT * FROM users WHERE email = ?";
    const values: string[] = [email]
    try {
        database.get(query, values, async (updateUserError: Error, user: User) => {
            if(updateUserError && !user){
                throw new ApiError("Erro ao encontrar o usuário", 404)
            }
            const isValidPassword = await checkUserPasswordToDatabaseEncryptedPassword(password, user.password)
            if(isValidPassword){
                return response.status(202).json(
                    { message: "Login realizado com sucesso!", user: { id: user.id, email: user.email, name: user.name} }
                );
            } else {
                throw new ApiError("E-mail ou senha incorretos", 404)
            }
        })
    } catch(error: any){
        throw new ApiError("Erro ao autenticar usuario", 400)
    }
}

export function deleteUser(request: Request, response: Response){
    const {body, params} = request
    const query: string = "DELETE FROM tasks WHERE id = ?";
    const values: string[] = [body.email, body.name, body.password, params.id]
    database.run(query, values, (updateUserError: Error) => {
        if(updateUserError){
            throw new ApiError("Erro ao encontrar o usuário", 404)
        }
        return response.status(200).send("Usuário deletado com sucesso!");
    })
}

export function updateUser(request: Request, response: Response){
    const { email, name, id } = request.body
    const query: string = "UPDATE users SET email = ?, name = ? WHERE id = ?";
    const values: string[] = [email, name, id]
    database.run(query, values, (updateUserError: Error) => {
        if(updateUserError){
            return response.status(400).send({ error: "Erro ao cadastrar", details: updateUserError.message });
            throw new ApiError("Erro ao atualizar o usuário", 404)
        }
        return response.status(200).json("Usuário editado!");
    })
}

export async function updatePassword(request: Request, response: Response){
    const { password, id } = request.body
    const encryptedPassword = await generateEncryptPassord(password)

    const query: string = "UPDATE users SET password = ? WHERE id = ?";
    const values: string[] = [encryptedPassword,  id]
    database.run(query, values, (updatePasswordError: Error) => {
        if(updatePasswordError){
            return response.status(400).send({ error: "Erro ao cadastrar", details: updatePasswordError.message });
            throw new ApiError("Erro ao atualizar o usuário", 404)
        }
        return response.status(200).json("Usuário editado!");
    })
}