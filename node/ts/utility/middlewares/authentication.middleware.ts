import { Response, Request, NextFunction, Handler } from "express";
import { Middleware } from "../interfaces";
import { LogLevel } from "../enums";
import { UnauthorizedError, ForbiddenError, InternalServerError } from "../errors";
import * as jwt from "jsonwebtoken";

export class AuthenticationMiddleware implements Middleware {
    private static openRoutes: string[] = [];

    constructor() {
        if (!process.env.JWT_SECRET) {
            console.log("JWT_SECRET environment variable not set!!!");
            process.exit(0);
        }
    }

    public static configureOpenRoutes(routes: string[]) {
        this.openRoutes = routes;
    }

    public static registerHandler(): Handler {
        return async (request: Request, response: Response, next: NextFunction) => {
            if (this.openRoutes.includes(request.path.substring(request.path.lastIndexOf('/'), request.path.length))) {
                return next();
            }

            const token: string | undefined = request.header('Authentication');

            if (token) {
                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    console.log(`ERROR: JWT_SECRET not found!`)
                    return next(new InternalServerError());
                }

                const jwtValid = jwt.verify(token, jwtSecret);
                if (!jwtValid) return next(new UnauthorizedError());

                const decodedJwt = jwt.decode(token);
                if (!decodedJwt || typeof decodedJwt !== 'object' || !decodedJwt.id) {
                    if (process.env.LOG_LEVEL === LogLevel.DEBUG) {
                        console.log("Invalid jwt token found:", token);
                    }
                    return next(new UnauthorizedError())
                };

                // TODO: Check this piece out and see what to do with it ...
                // const user: ExtendedDashboardUser = await Container.get<ExtendedDashboardUsersRepository>("ExtendedDashboardUsersRepository").getUserById(parseInt(decodedJwt.id, 10));
                // if (!user) return next(new UnauthorizedError());

                // response.locals.user = Object.assign(
                //     {},
                //     user,
                //     {
                //         role: await Container.get<RolesRepository>("RolesRepository").getRole(user.getRole())
                //     }
                // );


                // TODO: Remove this placeholder
                if (decodedJwt.id !== "192f1c8313") return next(new UnauthorizedError());

                response.locals.user = {
                    id: "192f1c8313",
                    name: "Admin",
                    role: {
                        id: 1,
                        name: "Admin"
                    }
                }
            } else {
                return next(new UnauthorizedError());
            }

            next();
        }
    }

    public static authorizeRoles(roles: string[]): any {
        return (request: Request, response: Response, next: NextFunction) => {
            const user: any = response.locals.user;

            if (this.openRoutes.includes(request.path.substring(request.path.lastIndexOf('/'), request.path.length)) || roles.includes("*")) {
                return next();
            }

            if (!user) {
                return next(new UnauthorizedError());
            }

            if (!roles.includes(user.role.name)) {
                return next(new ForbiddenError());
            }

            next();
        }
    }
}