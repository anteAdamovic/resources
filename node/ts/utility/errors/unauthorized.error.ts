export class UnauthorizedError extends Error {
    private _message: string = "You must provide a valid authentication token!";

    constructor(message?: string) {
        super(message);

        if (message) {
            this._message = message;
        }
    }
    
    public get status(): number {
        return 401;
    }

    public get message(): string {
        return this._message;
    }
}