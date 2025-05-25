"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
const toUserResponse = (user) => {
    const response = {
        username: user.username,
        name: user.name
    };
    return response;
};
exports.toUserResponse = toUserResponse;
