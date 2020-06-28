import { CustomError } from '../interfaces/custom-error.interface';

export class BadRequestError implements CustomError {
    private _name: string = "BadRequestError";
    private _message: string = "Bad request, check documentation for more info about this route!";

    constructor(message?: string) {
        if (message) {
            this._message = message;
        }
    }

    public get name(): string {
        return this._name;
    }

    public get message(): string { 
        return this._message; 
    }

    public get status(): number {
        return 400;
    }
}