import { UrlRepository } from "../repositories/url.repository";
import { nanoid } from "nanoid";

export class UrlService {
    static async createShortUrl(url: string, userId: number) {
        const shortUrl = nanoid(8);
        await UrlRepository.createUrl(url, shortUrl, userId);
        return shortUrl;
    }

    static async getUrlByShortCode(shortUrl: string) {
        return await UrlRepository.getUrlByShortCode(shortUrl);
    }

    static async updateUrl(id: number, url: string) {
        return await UrlRepository.updateUrl(id, url);
    }

    static async deleteUrl(id: number) {
        return await UrlRepository.deleteUrl(id);
    }
}
