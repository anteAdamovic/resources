export class NotFoundError extends Error {
    private _message: string = "Requested resource was not found!";

    constructor(message?: string) {
        super(message);

        if (message) {
            this._message = message;
        }
    }

    public get status(): number {
        return 404;
    }

    public get message(): string {
        return this._message;
    }
}