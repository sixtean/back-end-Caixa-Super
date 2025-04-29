import { Request, Response } from 'express';
import { Connection } from '../database/database';

export const home = async (req: Request, res: Response): Promise<any> => {
    try {
        const [rows]: any = await Connection.query('SELECT nome FROM users LIMIT 1');

        if (rows.length > 0) {
            const nome = rows[0].nome;
            return res.status(200).json({ nome });
        } else {
            return res.status(404).json({ erro: 'Nenhum usuário encontrado' });
        }
    } catch (error: any) {
        console.error('Erro ao buscar usuário: ', error);
        return res.status(500).json({ erro: 'Erro no servidor!' });
    }
}