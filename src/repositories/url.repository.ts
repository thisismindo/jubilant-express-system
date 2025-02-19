import { pool } from "../libs/db";
import { RowDataPacket } from "mysql2";

export class UrlRepository {
    static async createUrl(url: string, shortUrl: string, userId: number) {
        const sql_query: string = `
            INSERT INTO
                urls (url, shorturl, user_id)
            VALUES (?, ?, ?)
        `
        const [result] = await pool.execute(sql_query, [url, shortUrl, userId]);
        return result;
    }

    static async getUrlByShortCode(shortUrl: string) {
        const sql_query: string = `
            SELECT
                url
            FROM
                urls
            WHERE
                shorturl = ?
        `
        const [rows] = await pool.execute(sql_query, [shortUrl]);
        return (rows as RowDataPacket[])[0]?.url || null;
    }

    static async updateUrl(id: number, url: string) {
        const sql_query: string = `
            UPDATE
                urls
            SET
                url = ?
            WHERE
                id = ?
        `
        const [result] = await pool.execute(sql_query, [url, id]);
        return (result as any).affectedRows > 0;
    }

    static async deleteUrl(id: number) {
        const sql_query: string = `
            DELETE FROM
                urls
            WHERE
                id = ?
        `
        const [result] = await pool.execute(sql_query, [id]);
        return (result as any).affectedRows > 0;
    }
}
