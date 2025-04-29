"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const database_1 = require("../database/database");
const home = async (req, res) => {
    try {
        const [rows] = await database_1.Connection.query('SELECT nome FROM users LIMIT 1');
        if (rows.length > 0) {
            const nome = rows[0].nome;
            return res.status(200).json({ nome });
        }
        else {
            return res.status(404).json({ erro: 'Nenhum usuário encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao buscar usuário: ', error);
        return res.status(500).json({ erro: 'Erro no servidor!' });
    }
};
exports.home = home;
