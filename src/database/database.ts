import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

export const Connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
});


export const testeConnection = async () => {
    try {
        process.stdout.write('🔌 Conectando ao banco de dados...');
        const conn = await Connection.getConnection();
        await conn.ping();
        conn.release();
        console.log(colors.green('\r✅ Banco de dados conectado com sucesso!\n'));
    } catch (error) {
        console.log(colors.red('\r❌ Falha ao conectar no banco de dados!'));
        console.log(error);
    }
};