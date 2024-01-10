import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

export function validationErrors(err: any, _: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
        const { errors } = err;
        res.status(400).send({
            errors
        })
    }
    else {
        next(err)
    }
}


export function uncaughtErrors(err: any, _1: Request, res: Response, _2: NextFunction) {
    const resp: any = { message: err?.message }
    if(process.env.ENV == "DEV") 
        resp.stack = err?.stack
    res.status(500).json(resp)
}

export function notFound(_1: Request, res: Response, _2: NextFunction) {
    res.status(404).send()
}