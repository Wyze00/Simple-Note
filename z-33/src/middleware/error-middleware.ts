import { NextFunction, Response, Request } from "express";
import { ResponseError } from "../error/response-error";
import { ZodError } from "zod";

export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof ResponseError){

        res.status(err.status).send({
            errors: err.message
        })
        
    } else if(err instanceof ZodError) {

        res.status(400).send({
            errors: err.message
        })

    } else {

        res.status(500).send({
            errors: err.message
        })
    }

}