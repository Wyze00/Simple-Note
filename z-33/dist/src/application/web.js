"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("../middleware/error-middleware");
const public_1 = require("../router/public");
const private_1 = require("../router/private");
const cors_1 = __importDefault(require("cors"));
exports.web = (0, express_1.default)();
exports.web.use((0, cors_1.default)());
exports.web.use(express_1.default.json());
exports.web.use(public_1.publicApi);
exports.web.use(private_1.privateAPI);
exports.web.use(error_middleware_1.errorMiddleware);
