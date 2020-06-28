import { Request, Response } from "express";

export class ServerRequest {
    private body: any;
    private headers: any;
    private params: any;
    private query: any;
    private user: any = null;

    constructor(request: Request, response: Response) {
        if (request.body) {
            this.body = request.body;
        }
        if (request.headers) {
            this.headers = request.headers;
        }
        if (request.params) {
            this.params = request.params;
        }
        if (request.query) {
            this.query = request.query;
        }
        if (request.user) {
            this.user = request.user;
        }
    }

    public static construct(request: Request, response: Response): ServerRequest {
        return new ServerRequest(request, response);
    }

    public getUser(): any {
        return this.user;
    }

    public getFromBody(name: string) {
        return this.body[name];
    }

    public getBody(): any {
        return this.body;
    }

    public getFromHeaders(name: string) {
        return this.headers[name];
    }

    public getHeaders(): any {
        return this.headers;
    }

    public getFromParams(name: string): any {
        return this.params[name];
    }

    public getParams(): any {
        return this.params;
    }

    public getFromQuery(name: string): any {
        return this.query[name];
    }

    public getQuery(): any {
        return this.query;
    }
}