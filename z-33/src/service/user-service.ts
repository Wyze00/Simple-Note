import { User } from "@prisma/client";
import { prismaClient } from "../application/prismacClient";
import { ResponseError } from "../error/response-error";
import { toUserResponse, UserLoginRequest, UserRegisterRequest, UserResponse, UserUpdateRequest } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validator } from "../validation/validator";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

export class UserService {

    static async register(request: UserRegisterRequest): Promise<UserResponse> {

        const registerRequest = Validator.validate(UserValidation.REGISTER, request);

        const countUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if(countUsername === 1){
            throw new ResponseError(409, 'Username already exists');
        }

        const result = await prismaClient.user.create({
            data: {
                username: registerRequest.username,
                name: registerRequest.name,
                password: await bcrypt.hash(registerRequest.password, 10)
            }
        })

        return toUserResponse(result);
    }

    static async login(request: UserLoginRequest): Promise<UserResponse> {

        const loginRequest = Validator.validate(UserValidation.LOGIN, request);

        const user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })

        if(!user){
            throw new ResponseError(401, 'Username or Password is Wrong');
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

        if(!isPasswordValid){
            throw new ResponseError(401, 'Username or Password is Wrong');
        }

        const token = uuid();

        await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                token: token
            }
        })

        const response = toUserResponse(user);
        response.token = token;
        
        return response;
    }

    static async get(request: User): Promise<UserResponse> {
        return toUserResponse(request);
    }

    static async update(request: UserUpdateRequest, username: string): Promise<UserResponse> {

        const updateRequest = Validator.validate(UserValidation.UPDATE, request);

        if(updateRequest.password){
            updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
        }

        const response = await prismaClient.user.update({
            where: {
                username: username
            },
            data: updateRequest
        });

        return toUserResponse(response);
    }

    static async logout(username: string): Promise<void> {

        await prismaClient.user.update({
            where: {
                username: username
            },
            data: {
                token: null
            }
        })
    }
}