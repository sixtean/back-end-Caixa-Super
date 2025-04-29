"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsuario = void 0;
const database_1 = require("../database/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatorios!' });
        }
        const [usuarios] = await database_1.Connection.query('SELECT * FROM users WHERE email = ?', [email]);
        const usuario = usuarios[0];
        if (!usuario) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }
        const senhaCorreta = await bcrypt_1.default.compare(senha, usuario.senha);
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
    }
    catch (err) {
        console.log('Erro no login', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};
exports.loginUsuario = loginUsuario;
