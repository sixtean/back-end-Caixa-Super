import express from 'express';
import colors from 'colors';
import { testeConnection } from './database/database';
import cors from 'cors';
import router from './routes/userRoutes';

import { home } from './controllers/Home.controler';
import { buscarProdutoPorCodigo } from './controllers/Produtos.controler';

const app = express();

app.use(cors());
app.use(express.json());


  
app.use('/user', router);
app.get('/home', home)
app.get('/produtos/:codigo', buscarProdutoPorCodigo)
const PORT = 5000;


app.listen(PORT, () => {
    testeConnection();
});