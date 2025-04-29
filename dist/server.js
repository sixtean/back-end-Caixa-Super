"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const Home_controler_1 = require("./controllers/Home.controler");
const Produtos_controler_1 = require("./controllers/Produtos.controler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', userRoutes_1.default);
app.get('/home', Home_controler_1.home);
app.get('/produtos/:codigo', Produtos_controler_1.buscarProdutoPorCodigo);
const PORT = 5000;
app.listen(PORT, () => {
    (0, database_1.testeConnection)();
});
