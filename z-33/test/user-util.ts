import { prismaClient } from "../src/application/prismacClient";
import bcrypt from 'bcrypt';

export class UserTest {

    static async delete(){

        await prismaClient.user.deleteMany({
            where: {
                username: 'test'
            }
        })
    }

    static async create(){

        await prismaClient.user.create({
            data: {
                name: 'test',
                password: await bcrypt.hash('test', 10),
                username: 'test',
                token: 'test'
            }
        })
    }

    static async get(){

        const user = await prismaClient.user.findUnique({
            where: {
                username: 'test'
            }
        })

        return user!;
    }
}