import { Middleware, CustomError } from "../interfaces";
import { Response, Request, NextFunction, ErrorRequestHandler, Handler } from "express";
import { NotFoundError, InternalServerError } from "../errors";

export class ErrorMiddleware implements Middleware {

    public static asyncErrorHandler(handler: Function): any {
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                return await handler(request, response, next);
            } catch (e) {
                next(e);
            }
        }
    }

    public static registerHandler(): ErrorRequestHandler {
        return async (error: Error | CustomError, request: Request, response: Response, next: NextFunction) => {
            const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

            if ((<any>error).status) {

                if ((<any>error).errors) { 
                    response.status((<any>error).status).send({ message: (<any>error).message, errors: (<any>error).errors });

                    console.log(`${request.headers.host}${request.url} ${request.method} - Status: ${(<any>error).status} (${ip}) - ${(<any>error).message}`);
                } else {
                    response.status((<any>error).status).send({ message: (<any>error).message });

                    console.log(`${request.headers.host}${request.url} ${request.method} - Status: ${(<any>error).status} (${ip}) - ${(<any>error).message}`);
                }
            } else {
                console.log(error.message);

                const err = new InternalServerError();
                response.status(err.status).send({ message: err.message });

                console.log(`${request.headers.host}${request.url} ${request.method} - Status: 0 (${ip}) - ${err.message}`);
            }

            return;
        }
    }

    public static registerNotFoundHandler(): Handler {
        return (request: Request, response: Response, next: NextFunction) => {
            if (!response.locals.customResponse) {
                throw NotFoundError.forRoute();
            }

            next();
        }
    }
}