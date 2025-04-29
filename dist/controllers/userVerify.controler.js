"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarCodigo = void 0;
const database_1 = require("../database/database");
const verificarCodigo = async (req, res) => {
    const { codigo } = req.body;
    try {
        if (!codigo) {
            return res.status(400).json({ error: 'Código de verificação não fornecido' });
        }
        const [usuarios] = await database_1.Connection.query('SELECT * FROM users WHERE codigo_verificacao = ? AND verificado = false', [codigo]);
        const usuario = usuarios[0];
        if (!usuario) {
            return res.status(400).json({ error: 'Código inválido.', verificado: false });
        }
        if (usuario.codigo_verificacao === codigo) {
            await database_1.Connection.query('UPDATE users SET verificado = true WHERE codigo_verificacao = ?', [codigo]);
            return res.status(200).json({
                message: 'Usuário verificado com sucesso!',
                verificado: true
            });
        }
        else {
            return res.status(400).json({ error: 'Código incorreto' });
        }
    }
    catch (err) {
        console.log('Erro ao verificar código: ', err instanceof Error ? err.message : err);
        res.status(500).json({ error: 'Erro ao verificar o código' });
    }
};
exports.verificarCodigo = verificarCodigo;
