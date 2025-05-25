"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateAPI = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
exports.privateAPI = express_1.default.Router();
exports.privateAPI.use(auth_middleware_1.authMiddleware);
exports.privateAPI.get('/api/users', user_controller_1.UserController.get);
exports.privateAPI.patch('/api/users', user_controller_1.UserController.update);
exports.privateAPI.delete('/api/users', user_controller_1.UserController.logout);
