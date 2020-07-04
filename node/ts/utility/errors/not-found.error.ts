import { CustomError } from "../interfaces";

export class NotFoundError implements CustomError {
    private _name: string = "NotFoundError";
    private _message: string = "Requested resource was not found!";

    constructor(message?: string) {
        if (message) {
            this._message = message;
        }
    }

    public get name(): string {
        return this._name;
    }

    public get status(): number {
        return 404;
    }

    public get message(): string {
        return this._message;
    }

    public static forRoute(route?: string): NotFoundError {
        return new NotFoundError(`Requested route${route ? ` ${route}` : ''} was not found on this server!`);
    }
}