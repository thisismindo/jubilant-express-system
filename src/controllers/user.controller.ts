import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserService } from "../services/user.service";
import { apiResponse } from "../libs/response";

export class UserController {
    static createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, email } = req.body;
            await UserService.createUser(name, email);
            res.status(201).json(apiResponse(true, ""));
        } catch (error) {
            next(error);
        }
    };

    static getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await UserService.getUserById(parseInt(req.params.id));
            if (!user) {
                res.status(404).json(apiResponse(false, "User not found"));
                return;
            }
            res.json(apiResponse(true, "", user));
        } catch (error) {
            next(error);
        }
    };

    static updateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name } = req.body;
            const updated = await UserService.updateUser(parseInt(req.params.id), name);
            if (!updated) {
                res.status(404).json(apiResponse(false, "User not found"));
                return;
            }
            res.json(apiResponse(true, "User updated successfully"));
        } catch (error) {
            next(error);
        }
    };

    static deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deleted = await UserService.deleteUser(parseInt(req.params.id));
            if (!deleted) {
                res.status(404).json(apiResponse(false, "User not found"));
                return;
            }
            res.json(apiResponse(true, "User deleted successfully"));
        } catch (error) {
            next(error);
        }
    };
}
