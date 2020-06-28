export class InternalServerError extends Error {
    private _message: string = "Something went wrong and we're not sure what, but we're on top of it!";

    constructor(message?: string) {
        super(message);

        if (message) {
            this._message = message;
        }
    }

    public get status(): number {
        return 500;
    }

    public get message(): string {
        return this._message;
    }
}