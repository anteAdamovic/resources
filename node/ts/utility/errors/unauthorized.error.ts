import { CustomError } from "../interfaces";

export class UnauthorizedError implements CustomError {
    private _name: string = "UnauthorizedError";
    private _message: string = "You must provide a valid authentication token!";

    constructor(message?: string) {
        if (message) {
            this._message = message;
        }
    }

    public get name(): string {
        return this._name;
    }
    
    public get status(): number {
        return 401;
    }

    public get message(): string {
        return this._message;
    }
}