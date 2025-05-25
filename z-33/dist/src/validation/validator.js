"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    static validate(schema, request) {
        return schema.parse(request);
    }
}
exports.Validator = Validator;
