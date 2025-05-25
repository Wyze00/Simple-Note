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
exports.UserService = void 0;
const prismacClient_1 = require("../application/prismacClient");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validator_1 = require("../validation/validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validator_1.Validator.validate(user_validation_1.UserValidation.REGISTER, request);
            const countUsername = yield prismacClient_1.prismaClient.user.count({
                where: {
                    username: registerRequest.username
                }
            });
            if (countUsername === 1) {
                throw new response_error_1.ResponseError(409, 'Username already exists');
            }
            const result = yield prismacClient_1.prismaClient.user.create({
                data: {
                    username: registerRequest.username,
                    name: registerRequest.name,
                    password: yield bcrypt_1.default.hash(registerRequest.password, 10)
                }
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validator_1.Validator.validate(user_validation_1.UserValidation.LOGIN, request);
            const user = yield prismacClient_1.prismaClient.user.findUnique({
                where: {
                    username: loginRequest.username
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, 'Username or Password is Wrong');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, 'Username or Password is Wrong');
            }
            const token = (0, uuid_1.v4)();
            yield prismacClient_1.prismaClient.user.update({
                where: {
                    username: user.username
                },
                data: {
                    token: token
                }
            });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = token;
            return response;
        });
    }
    static get(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(request);
        });
    }
    static update(request, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validator_1.Validator.validate(user_validation_1.UserValidation.UPDATE, request);
            if (updateRequest.password) {
                updateRequest.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            const response = yield prismacClient_1.prismaClient.user.update({
                where: {
                    username: username
                },
                data: updateRequest
            });
            return (0, user_model_1.toUserResponse)(response);
        });
    }
    static logout(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismacClient_1.prismaClient.user.update({
                where: {
                    username: username
                },
                data: {
                    token: null
                }
            });
        });
    }
}
exports.UserService = UserService;
