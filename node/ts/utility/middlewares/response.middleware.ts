import { Middleware } from "@Utility/interfaces";
import { Response, Request, NextFunction, Handler } from "express";
import { ServerResponse } from "@Utility/http";
import { LoggerService } from "@Utility/services";
import Container from "typedi";
import { RedirectResponse } from "@Utility/http/redirect.response";

export class ResponseMiddleware implements Middleware {

    public static registerHandler(): Handler {
        return (request: Request, response: Response, next: NextFunction) => {
            const loggerService: LoggerService = Container.get<LoggerService>("LoggerService");
            const customResponse: ServerResponse | RedirectResponse = response.locals.customResponse;

            if (!customResponse) {
                next();
            } else if (customResponse instanceof ServerResponse) {
                response.status(customResponse.getStatus());
                response.setHeader("Content-Type", "application/json");

                if (customResponse.hasData()) {
                    if (typeof customResponse.getData() === "string") {
                        response.send(customResponse.getData());
                    } else {
                        response.json(customResponse.getData());
                    }
                } else {
                    response.end();
                }

                const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
                loggerService.serverLog(`${request.headers.host}${request.url} ${request.method} - Status: ${customResponse.getStatus()} (${ip})`);
                return;
            } else if (customResponse instanceof RedirectResponse) {
                const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
                loggerService.serverLog(`${request.headers.host}${request.url} ${request.method} - Status: REDIRECT (${ip})`);
                response.redirect(customResponse.getUrl());
                return;
            } else {
                response.status(400);
                response.send();
                response.end();
            }
        }
    }
}