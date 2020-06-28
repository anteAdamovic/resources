import { Response, NextFunction } from "express";
import { ServerResponse } from "./server.response";
import { RedirectResponse } from "./redirect.response";

export class ResponseHandler {
    public static handleResponse(response: Response, next: NextFunction, customResponse: ServerResponse | RedirectResponse | void) {
        response.locals.customResponse = customResponse;
        next();
    }
}