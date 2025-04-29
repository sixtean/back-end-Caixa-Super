import { Request, Response } from "express";
import { Connection } from "../database/database";
import { Users } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const gerarCodigoVerificacao = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const enviarEmailComCodigo = async (email: string, codigo: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Contech System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Seu código de verificação',
        html: `
            <html>
                <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI, 'Helvetica Neue', 'Helvetica, Arial, sans-serif; color: #2c3e50">
                    <div style="max-widht: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; padding: 30px 40px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);">
                        
                        <div style="text-align: center; margin-bottom: 30px;">
                            <img src="https://i.pinimg.com/736x/bc/31/cc/bc31cc4e0ae8fff94afddeeb1297b34f.jpg" alt="Logo" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover; border: 3px solid #4CAF50;">
                        </div>
            
                        <h2 style="color: #2c3e50; font-size: 24px; text-align: center; margin-bottom: 10px;">Verificação de Código</h2>
            
                        <p style="font-size: 16px; color: #555; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                            Olá! 👋<br>
                            Obrigado por usar nossa plataforma. Seu código de verificação está logo abaixo. Por favor, insira-o no site para finalizar sua verificação de forma segura.
                        </p>

                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="display: inline-block; backgroud-color: #f0f8f5; border: 1px solid #c9efdc; padding: 20px 40px; border-radius: 10px;">
                                <span style="font-size: 28px; font-weight: bold; color: #27ae60; letter-spacing: 2px">${codigo}</span>
                            </div>
                        </div>

            
                        <div style="text-align: center; margin_bottom: 30px">
                            <p style="font-size: 14px; color: #777;">Você pode acessar a página abaixo para verificar o codigo.</p>
                            <a href="http://192.168.0.107:3000/verify-code" style="color: 4CAF50; font-size: 15px; text-decoration: underline;">
                                http://192.168.0.107:3000/verify-code
                            </a>
                        </div>

                        <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e1e1e1;">
                        
                        <footer style="font-size: 14px; color: #999; text-align: center;">
                            <p>Este é um e-mail automático. Por favor, não responda.</p>
                            <p style="font-size: 13px;"> Se você não solicitou este código, por favor, ignore este e-mail.</p> 
                        </footer>
                    </div>
                </body>
            </html>
        `
    };
    await transporter.sendMail(mailOptions);
}

export const userRegister = async (req: Request, res: Response) => {
    const {nome, email, senha} = req.body;
    console.log('Dados recebidos: ', {nome, email, senha});

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const codigo = gerarCodigoVerificacao();
        const novoUsuario: Users = {
            nome,
            email,
            senha: senhaCriptografada,
            verificado: false,
            codigo_verificacao: codigo,
        };
        await Connection.query(
            'INSERT INTO users (nome, email, senha, verificado, codigo_verificacao) VALUES (?, ?, ?, ?, ?)',
            [novoUsuario.nome, novoUsuario.email, novoUsuario.senha, novoUsuario.verificado, novoUsuario.codigo_verificacao]
        );

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET não está definido no .env");
        }
        const token = jwt.sign(
            {
                email,
                codigo,
                nome,
                role: 'usuario'
            },
            jwtSecret,
            { expiresIn: '10m' }
        );

        await enviarEmailComCodigo(email, codigo);

        res.status(201).json({
            message: "Usuário registrado com sucesso. Verifique seu e-mail para confirmar.",
            tokenVerificado: token
        });
    } catch (error) {
        console.log("Erro ao registrar usuário: ", error instanceof Error ? error.message : error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}