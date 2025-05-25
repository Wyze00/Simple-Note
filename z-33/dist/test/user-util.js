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
exports.UserTest = void 0;
const prismacClient_1 = require("../src/application/prismacClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserTest {
    static delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismacClient_1.prismaClient.user.deleteMany({
                where: {
                    username: 'test'
                }
            });
        });
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismacClient_1.prismaClient.user.create({
                data: {
                    name: 'test',
                    password: yield bcrypt_1.default.hash('test', 10),
                    username: 'test',
                    token: 'test'
                }
            });
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismacClient_1.prismaClient.user.findUnique({
                where: {
                    username: 'test'
                }
            });
            return user;
        });
    }
}
exports.UserTest = UserTest;
