"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const web_1 = require("../src/application/web");
const user_util_1 = require("./user-util");
const bcrypt_1 = __importDefault(require("bcrypt"));
(0, vitest_1.describe)('POST /api/users', () => {
    (0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.delete();
    }));
    (0, vitest_1.it)('should can create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users')
            .send({
            username: 'test',
            name: 'test',
            password: 'test'
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.username).toBe('test');
        (0, vitest_1.expect)(response.body.data.name).toBe('test');
    }));
    (0, vitest_1.it)('should reject if no username', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users')
            .send({
            name: 'test',
            password: 'test'
        });
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
    (0, vitest_1.it)('should reject if no name', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users')
            .send({
            username: 'test',
            password: 'test'
        });
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
    (0, vitest_1.it)('should reject if no password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users')
            .send({
            username: 'test',
            name: 'test'
        });
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
    (0, vitest_1.it)('should reject if username already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const responseDummy = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users')
            .send({
            username: 'test',
            name: 'test',
            password: 'test'
        });
        (0, vitest_1.expect)(responseDummy.status).toBe(200);
        (0, vitest_1.expect)(responseDummy.body.data.username).toBe('test');
        (0, vitest_1.expect)(responseDummy.body.data.name).toBe('test');
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users')
            .send({
            username: 'test',
            name: 'test2',
            password: 'test2'
        });
        (0, vitest_1.expect)(response.status).toBe(409);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
});
(0, vitest_1.describe)('POST /api/users/login', () => {
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.create();
    }));
    (0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.delete();
    }));
    (0, vitest_1.it)('should can login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users/login')
            .send({
            username: 'test',
            password: 'test'
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.username).toBe('test');
        (0, vitest_1.expect)(response.body.data.name).toBe('test');
        (0, vitest_1.expect)(response.body.data.token).toBeDefined();
    }));
    (0, vitest_1.it)('should reject if username is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users/login')
            .send({
            username: 'test2',
            password: 'test'
        });
        (0, vitest_1.expect)(response.status).toBe(401);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
    (0, vitest_1.it)('should reject if password is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users/login')
            .send({
            username: 'test',
            password: 'test3'
        });
        (0, vitest_1.expect)(response.status).toBe(401);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
    (0, vitest_1.it)('should reject if username is not defined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users/login')
            .send({
            password: 'test'
        });
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
    (0, vitest_1.it)('should reject if password is not defined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post('/api/users/login')
            .send({
            username: 'test'
        });
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
});
(0, vitest_1.describe)('GET /api/users', () => {
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.create();
    }));
    (0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.delete();
    }));
    (0, vitest_1.it)('should can login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get('/api/users')
            .set('X-API-TOKEN', 'test');
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.username).toBe('test');
        (0, vitest_1.expect)(response.body.data.name).toBe('test');
    }));
    (0, vitest_1.it)('should reject if token is undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get('/api/users');
        (0, vitest_1.expect)(response.status).toBe(401);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
});
(0, vitest_1.describe)('PATCH /api/users', () => {
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.create();
    }));
    (0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.delete();
    }));
    (0, vitest_1.it)('should can update name and password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch('/api/users')
            .set('X-API-TOKEN', 'test')
            .send({
            name: 'test2',
            password: 'test2'
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.username).toBe('test');
        (0, vitest_1.expect)(response.body.data.name).toBe('test2');
        const user = yield user_util_1.UserTest.get();
        (0, vitest_1.expect)(yield bcrypt_1.default.compare('test2', user.password)).toBe(true);
    }));
    (0, vitest_1.it)('should can update name only', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch('/api/users')
            .set('X-API-TOKEN', 'test')
            .send({
            name: 'test2',
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.username).toBe('test');
        (0, vitest_1.expect)(response.body.data.name).toBe('test2');
    }));
    (0, vitest_1.it)('should can update password only', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch('/api/users')
            .set('X-API-TOKEN', 'test')
            .send({
            password: 'test2'
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.username).toBe('test');
        (0, vitest_1.expect)(response.body.data.name).toBe('test');
        const user = yield user_util_1.UserTest.get();
        (0, vitest_1.expect)(yield bcrypt_1.default.compare('test2', user.password)).toBe(true);
    }));
    (0, vitest_1.it)('should reject if token is false', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch('/api/users')
            .set('X-API-TOKEN', 'test2')
            .send({
            name: 'test2',
            password: 'test2'
        });
        (0, vitest_1.expect)(response.status).toBe(401);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
});
(0, vitest_1.describe)('DELETE /api/users', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.create();
    }));
    (0, vitest_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_util_1.UserTest.delete();
    }));
    (0, vitest_1.it)('should can do logout', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete('/api/users')
            .set('X-API-TOKEN', 'test');
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data).toBe('OK');
    }));
    (0, vitest_1.it)('should reject if token is undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete('/api/users');
        (0, vitest_1.expect)(response.status).toBe(401);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
    (0, vitest_1.it)('should reject if token is false', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete('/api/users')
            .set('X-API-TOKEN', 'test2');
        (0, vitest_1.expect)(response.status).toBe(401);
        (0, vitest_1.expect)(response.body.errors).toBeDefined();
    }));
}));
