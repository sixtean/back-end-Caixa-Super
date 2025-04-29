import { Request, Response } from 'express';
import { Connection } from '../database/database';


export const verificarCodigo = async (req: Request, res: Response): Promise<any> => {
    const { codigo } = req.body;

    try {
        if (!codigo) {
            return res.status(400).json({ error: 'Código de verificação não fornecido' });
        }

        const [usuarios]: any[] = await Connection.query(
            'SELECT * FROM users WHERE codigo_verificacao = ? AND verificado = false',
            [codigo]
        );

        const usuario = usuarios[0];

        if (!usuario) {
            return res.status(400).json({ error: 'Código inválido.', verificado: false });
        }

        if (usuario.codigo_verificacao === codigo) {
            await Connection.query(
                'UPDATE users SET verificado = true WHERE codigo_verificacao = ?',
                [codigo]
            );
            return res.status(200).json({ 
                message: 'Usuário verificado com sucesso!',
                verificado: true
            });
        } else {
            return res.status(400).json({ error: 'Código incorreto' });
        } 
    } catch (err) {
        console.log('Erro ao verificar código: ', err instanceof Error ? err.message : err);
        res.status(500).json({ error: 'Erro ao verificar o código' });
    }
};