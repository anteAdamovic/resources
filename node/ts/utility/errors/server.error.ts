import { CustomError } from "../interfaces";

export class InternalServerError implements CustomError {
    private _name: string = "InternalServerError";
    private _message: string = "Something went wrong and we're not sure what, but we're on top of it!";

    constructor(message?: string) {
        if (message) {
            this._message = message;
        }
    }

    public get name(): string {
        return this._name;
    }

    public get status(): number {
        return 500;
    }

    public get message(): string {
        return this._message;
    }
}