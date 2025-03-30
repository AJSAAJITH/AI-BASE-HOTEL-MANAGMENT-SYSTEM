import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../../domain/errors/forbidden_error";

export const isAmdin = (req: Request, res: Response, next: NextFunction) => {
    if (req?.auth?.sessionClaims?.metadata?.role !== "admin") {
        throw new ForbiddenError("FobiddenError");
    }
    // console.log(req?.auth?.sessionClaims?.metadata?.role);
    next();
}
