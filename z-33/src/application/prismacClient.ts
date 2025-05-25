import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({
   log: [
        {
            level: 'error',
            emit: 'event'
        },
        {
            level: 'warn',
            emit: 'event'
        },
        {
            level: 'info',
            emit: 'event'
        },
        {
            level: 'query',
            emit: 'event'
        }
   ] 
});

prismaClient.$on('error', (event) => {
   logger.error(event);
});

prismaClient.$on('warn', (event) => {
   logger.warn(event);
});

prismaClient.$on('info', (event) => {
   logger.info(event);
});

prismaClient.$on('query', (event) => {
   logger.info(event);
});