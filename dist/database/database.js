"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testeConnection = exports.Connection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
dotenv_1.default.config();
exports.Connection = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 46876
});
const testeConnection = async () => {
    try {
        process.stdout.write('🔌 Conectando ao banco de dados...');
        const conn = await exports.Connection.getConnection();
        await conn.ping();
        conn.release();
        console.log(colors_1.default.green('\r✅ Banco de dados conectado com sucesso!\n'));
    }
    catch (error) {
        console.log(colors_1.default.red('\r❌ Falha ao conectar no banco de dados!'));
        console.log(error);
    }
};
exports.testeConnection = testeConnection;
