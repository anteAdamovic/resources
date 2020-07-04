import { CustomError } from "../interfaces";

export class UnavailableError implements CustomError {
  private _name: string = "UnavailableError";
  private _message: string = "Server is unavailable right now!";

  constructor(message?: string) {
    if (message) {
      this._message = message;
    }
  }

  public get name(): string {
    return this._name;
  }

  public get status(): number {
    return 503;
  }

  public get message(): string {
    return this._message;
  }
}