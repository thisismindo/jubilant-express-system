import { pool } from "../libs/db";
import { RowDataPacket } from "mysql2";

export class UserRepository {
    static async createUser(name: string, email: string) {
        const sql_query: string = `
            INSERT INTO
                users (name, email)
            VALUES (?, ?)
        `
        const [result] = await pool.execute(sql_query, [name, email]);
        return result;
    }

    static async getUserById(id: number) {
        const sql_query: string = `
            SELECT
                name,
                email
            FROM
                users
            WHERE
                id = ?
        `
        const [rows] = await pool.execute(sql_query, [id]);
        return (rows as RowDataPacket[])[0] || null;
    }

    static async updateUser(id: number, name: string) {
        const sql_query: string = `
            UPDATE
                users
            SET
                name = ?
            WHERE
                id = ?
        `
        const [result] = await pool.execute(sql_query, [name, id]);
        return (result as any).affectedRows > 0;
    }

    static async deleteUser(id: number) {
        const sql_query: string = `
            DELETE FROM
                users
            WHERE
                id = ?
        `
        const [result] = await pool.execute(sql_query, [id]);
        return (result as any).affectedRows > 0;
    }
}
