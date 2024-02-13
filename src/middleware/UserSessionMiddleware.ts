import { NextFunction, Request, Response } from "express";
import { GetUserSession } from "../public/lib/auth/UserSession";

export function AddUserSessionToLocals (req: Request, res: Response, next: NextFunction) {
    const userSession = GetUserSession(req);
    res.locals.userSession = userSession;
    next();
};

export function CheckUserSession(req: Request, res: Response, next: NextFunction) {
    const userSession = GetUserSession(req);
    if (!userSession) {
        return res.redirect("/auth/signin");
    }
    next();
}