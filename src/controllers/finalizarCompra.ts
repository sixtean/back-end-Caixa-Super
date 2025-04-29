import { Request, Response } from "express";
import { Connection } from "../database/database";

export const finalizarCompra = async (req: Request, res: Response) => {
    const [rows]: any = await Connection.query('SELECT nome FROM users LIMIT 1');

    if (rows.length > 0) {
        const nome = rows[0].nome;
        return res.status(200).json({ nome });
    }
}