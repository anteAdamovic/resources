export interface Middleware {
    registerHandler?(handler: Function): Function;
}