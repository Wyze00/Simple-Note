import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../application/prismacClient";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {

    const token = req.get('X-API-TOKEN');

    if(!token){

        res.status(401).send({
            errors: 'Unauthorized'
        })
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            token: token
        }
    })

    if(!user){

        res.status(401).send({
            errors: 'Unauthorized'
        })
        return;
    }

    req.user = user!;
    next();
}