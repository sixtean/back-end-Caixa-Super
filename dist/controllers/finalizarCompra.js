"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizarCompra = void 0;
const database_1 = require("../database/database");
const finalizarCompra = async (req, res) => {
    const [rows] = await database_1.Connection.query('SELECT nome FROM users LIMIT 1');
    if (rows.length > 0) {
        const nome = rows[0].nome;
        return res.status(200).json({ nome });
    }
};
exports.finalizarCompra = finalizarCompra;
