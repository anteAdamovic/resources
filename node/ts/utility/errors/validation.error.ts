import { ValidationResult } from "../interfaces";

export class ValidationError extends Error {
    private _message: string = "Bad request, check documentation for more info about this route!";
    private _errors: string[];

    constructor(result: ValidationResult, message?: string) {
        super(message ? message : "Validation Error")

        if (message) {
            this._message = message;
        }

        this._errors = result.errors;
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