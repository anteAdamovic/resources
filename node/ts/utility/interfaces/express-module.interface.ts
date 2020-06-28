import { Router } from "express";

export interface ExpressModule {
    export(): Router;
}