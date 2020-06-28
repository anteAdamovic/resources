import { CustomError } from '../interfaces';

export class ForbiddenError implements CustomError {
    private _name: string = "ForbiddenError";
    private _message: string = "You are not authorized to access this resource!";

    constructor(message?: string) {
        if (message) {
            this._message = message;
        }
    }

    public get name(): string {
        return this._name;
    }

    public get status(): number {
        return 403;
    }

    public get message(): string {
        return this._message;
    }
}