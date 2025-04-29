import { Request, Response } from "express";
import produtos from '../data/produtos.json';

export const buscarProdutoPorCodigo = (req: Request, res: Response): void => {
    const { codigo } = req.params;

    const produtoEncontrado = produtos.find(produto => produto.codigo === codigo);

    if (produtoEncontrado) {
        res.status(200).json(produtoEncontrado);
    } else {
        res.status(404).json({ erro: 'Produto não encontrado!' });
    }
};