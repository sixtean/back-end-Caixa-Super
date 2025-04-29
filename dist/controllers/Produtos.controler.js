"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarProdutoPorCodigo = void 0;
const produtos_json_1 = __importDefault(require("../data/produtos.json"));
const buscarProdutoPorCodigo = (req, res) => {
    const { codigo } = req.params;
    const produtoEncontrado = produtos_json_1.default.find(produto => produto.codigo === codigo);
    if (produtoEncontrado) {
        res.status(200).json(produtoEncontrado);
    }
    else {
        res.status(404).json({ erro: 'Produto não encontrado!' });
    }
};
exports.buscarProdutoPorCodigo = buscarProdutoPorCodigo;
