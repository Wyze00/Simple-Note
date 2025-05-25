import { ZodType } from "zod";

export class Validator {

    static validate<T>(schema: ZodType, request: T): T{
        return schema.parse(request);
    }
}