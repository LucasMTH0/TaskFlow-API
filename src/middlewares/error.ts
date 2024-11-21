
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/api-errors';
export const errorMiddleware = (
    error: Error & Partial<ApiError>, 
    request: Request, 
    response: Response,
    next: NextFunction
) => {  
    const statusCode: number = error.statusCode ?? 500
    const message = error.statusCode ? error.message : "Internal error server."
    return response.status(500).json(message)
}