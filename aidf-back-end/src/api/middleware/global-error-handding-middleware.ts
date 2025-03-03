import { Request, Response, NextFunction } from "express";

const globleErrorHandilngMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(error);
    if (error.name === "NotFoundError") {
        res.status(404).json({ error: error.message });
        return;
    }
    if (error.name === "ValidationError") {
        res.status(400).json({ error: error.message });
        return;
    }
    res.status(500).send();
}

export default globleErrorHandilngMiddleware;