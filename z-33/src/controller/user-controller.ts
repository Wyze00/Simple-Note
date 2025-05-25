import { NextFunction, Request, response, Response } from 'express';
import { UserLoginRequest, UserRegisterRequest, UserUpdateRequest } from '../model/user-model';
import { UserService } from '../service/user-service';
import { UserRequest } from '../type/user-request';
import { User } from '@prisma/client';

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction){

        try {

            const request: UserRegisterRequest = req.body as UserRegisterRequest;
            const response = await UserService.register(request);

            res.status(200).send({
                data: response
            })

        } catch(e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction){

        try {

            const request: UserLoginRequest = req.body as UserLoginRequest;
            const response = await UserService.login(request);

            res.status(200).send({
                data: response
            })

        } catch(e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction){

        try {

            const request: User = req.user!;
            const response = await UserService.get(request);

            res.status(200).send({
                data: response
            })

        } catch(e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){

        try {

            const username = req.user!.username;
            const request: UserUpdateRequest = req.body;

            const response = await UserService.update(request, username);

            res.status(200).send({
                data: response
            })

        } catch(e) {
            next(e);
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction){

        try {

            const username = req.user!.username;
            await UserService.logout(username);

            res.status(200).send({
                data: 'OK'
            })

        } catch(e) {
            next(e);
        }
    }
}