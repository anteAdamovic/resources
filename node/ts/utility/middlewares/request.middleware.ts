import { Middleware } from "../interfaces";
import { ServerRequest } from "../http";
import { Response, Request, NextFunction, Handler } from "express";

export class RequestMiddleware implements Middleware {

    public static registerHandler(): Handler {
        return (request: Request, response: Response, next: NextFunction) => {
            response.locals.serverRequest = new ServerRequest(request, response);
            next();
        }
    }
}