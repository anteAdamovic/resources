import { ValidationResult, CustomError } from "../interfaces";

export class ValidationError implements CustomError {
    private _name: string = "ValidationError";
    private _message: string = "Bad request, check documentation for more info about this route!";
    private _errors: string[];

    constructor(result: ValidationResult, message?: string) {
        if (message) {
            this._message = message;
        }

        this._errors = result.errors;
    }

    public get name(): string {
        return this._name;
    }

    public get status(): number {
        return 400;
    };

    public get message(): string {
        return this._message;
    }

    public get errors(): string[] {
        return this._errors;
    }
}