import { Request, Response, NextFunction, RequestHandler } from "express";
import { UrlService } from "../services/url.service";
import { UserService } from "../services/user.service";
import { apiResponse } from "../libs/response";

export class UrlController {
    static createUrl: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { url, user_id } = req.body;
            const userInfo = await UserService.getUserById(parseInt(user_id));
            if (!userInfo) {
                res.status(422).json(apiResponse(false, "User not found"));
            } else {
                const shortUrl = await UrlService.createShortUrl(url, user_id);
                res.status(201).json(apiResponse(true, "", { shortUrl: shortUrl }));
            }


        } catch (err) {
            next(err);
        }
    };

    static getUrl: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const shortUrl = req.params.shorturl;
            const url = await UrlService.getUrlByShortCode(shortUrl);
            if (!url) {
                res.status(404).json(apiResponse(false, "URL not found"));
                return;
            }
            res.status(200).json(apiResponse(true, "", { url: url }));
        } catch (err) {
            next(err);
        }
    };

    static updateUrl: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { url } = req.body;
            const updated = await UrlService.updateUrl(Number(id), url);
            if (updated) {
                res.status(200).json(apiResponse(true, "URL updated successfully"));
            } else {
                res.status(404).json(apiResponse(false, "URL not found"));
            }
        } catch (err) {
            next(err);
        }
    };

    static deleteUrl: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const deleted = await UrlService.deleteUrl(Number(id));
            if (deleted) {
                res.status(200).json(apiResponse(true, "URL deleted successfully"));
            } else {
                res.status(404).json(apiResponse(false, "URL not found"));
            }
        } catch (err) {
            next(err);
        }
    };
}
