import { Request, Response } from "express";
import { Connection } from "../database/database";
import bcrypt from 'bcrypt';

export const loginUsuario = async (req: Request, res: Response): Promise<any> => {
    const {email, senha} = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatorios!' });
        }

        const [usuarios]: any[] = await Connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        const usuario = usuarios[0];

        if (!usuario) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        if (!usuario.verificado) {
            return res.status(403).json({ error: 'Usuário não verificado', verificado: false });
        }

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            login: true
        });
    } catch (err) {
        console.log('Erro no login', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};