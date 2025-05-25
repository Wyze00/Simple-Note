import { User } from "@prisma/client";

export interface UserResponse {
    username: string;
    name: string;
    token?: string;
}

export interface UserLoginRequest {
    username: string;
    password: string;
}

export interface UserRegisterRequest {
    username: string;
    password: string;
    name: string
}

export interface UserUpdateRequest {
    name?: string;
    password?: string;
}

export const toUserResponse = (user: User): UserResponse => {

    const response: UserResponse = {
        username: user.username,
        name: user.name
    }

    return response;
}