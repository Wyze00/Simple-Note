import {expect, it, describe, afterEach, beforeEach } from 'vitest';
import supertest from 'supertest';
import { web } from '../src/application/web';
import { UserTest } from './user-util';
import bcrypt from 'bcrypt';

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should can create user', async () => {

        const response = await supertest(web)
                            .post('/api/users')
                            .send({
                                username: 'test',
                                name: 'test',
                                password: 'test'
                            })
        ;

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
    });

    it('should reject if no username', async () => {
       
        const response = await supertest(web)
                            .post('/api/users')
                            .send({
                                name: 'test',
                                password: 'test'
                            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject if no name', async () => {
       
        const response = await supertest(web)
                            .post('/api/users')
                            .send({
                                username: 'test',
                                password: 'test'
                            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject if no password', async () => {
       
        const response = await supertest(web)
                            .post('/api/users')
                            .send({
                                username: 'test',
                                name: 'test'
                            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject if username already exists', async () => {

        const responseDummy = await supertest(web)
                            .post('/api/users')
                            .send({
                                username: 'test',
                                name: 'test',
                                password: 'test'
                            })
        ;

        expect(responseDummy.status).toBe(200);
        expect(responseDummy.body.data.username).toBe('test');
        expect(responseDummy.body.data.name).toBe('test');
       
        const response = await supertest(web)
                            .post('/api/users')
                            .send({
                                username: 'test',
                                name: 'test2',
                                password: 'test2'
                            })
        ;

        expect(response.status).toBe(409);
        expect(response.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', () => {

    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should can login', async () => {
        
        const response = await supertest(web)
                            .post('/api/users/login')
                            .send({
                                username: 'test',
                                password: 'test'
                            })
        ;

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
        expect(response.body.data.token).toBeDefined();
    });

    it('should reject if username is wrong', async () => {
        
        const response = await supertest(web)
                            .post('/api/users/login')
                            .send({
                                username: 'test2',
                                password: 'test'
                            })
        ;

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject if password is wrong', async () => {
        
        const response = await supertest(web)
                            .post('/api/users/login')
                            .send({
                                username: 'test',
                                password: 'test3'
                            })
        ;

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject if username is not defined', async () => {
        
        const response = await supertest(web)
                            .post('/api/users/login')
                            .send({
                                password: 'test'
                            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject if password is not defined', async () => {
        
        const response = await supertest(web)
                            .post('/api/users/login')
                            .send({
                                username: 'test'
                            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/users', () => {
    
    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should can login', async () => {
        
        const response = await supertest(web)
                            .get('/api/users')
                            .set('X-API-TOKEN', 'test')
        ;

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
    });
    
    it('should reject if token is undefined', async () => {
        
        const response = await supertest(web)
                            .get('/api/users')
        ;

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe('PATCH /api/users', () => {
    
    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should can update name and password', async () => {

        const response = await supertest(web)
                            .patch('/api/users')
                            .set('X-API-TOKEN', 'test')
                            .send({
                                name: 'test2',
                                password: 'test2'
                            })
        ;

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test2');

        const user = await UserTest.get();

        expect(await bcrypt.compare('test2', user.password)).toBe(true);
    });

    it('should can update name only', async () => {

        const response = await supertest(web)
                            .patch('/api/users')
                            .set('X-API-TOKEN', 'test')
                            .send({
                                name: 'test2',
                            })
        ;

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test2');
    });

    it('should can update password only', async () => {

        const response = await supertest(web)
                            .patch('/api/users')
                            .set('X-API-TOKEN', 'test')
                            .send({
                                password: 'test2'
                            })
        ;

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');

        const user = await UserTest.get();

        expect(await bcrypt.compare('test2', user.password)).toBe(true);
    });

    it('should reject if token is false', async () => {

        const response = await supertest(web)
                            .patch('/api/users')
                            .set('X-API-TOKEN', 'test2')
                            .send({
                                name: 'test2',
                                password: 'test2'
                            })
        ;

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe('DELETE /api/users', async () => {
    
    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should can do logout', async () => {

        const response = await supertest(web)
                            .delete('/api/users')
                            .set('X-API-TOKEN', 'test')
        ;

        expect(response.status).toBe(200);
        expect(response.body.data).toBe('OK');

    });

    it('should reject if token is undefined', async () => {
        
         const response = await supertest(web)
                            .delete('/api/users')
        ;

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();

    });

    it('should reject if token is false', async () => {
        
         const response = await supertest(web)
                            .delete('/api/users')
                            .set('X-API-TOKEN', 'test2')

        ;

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();

    });
});