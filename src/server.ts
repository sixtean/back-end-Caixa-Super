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

app.listen(5000, () => {
    testeConnection();

    console.log('\n')
    console.log(colors.blue('============================================================\n'));
    console.log(colors.blue('== O Servidor está rodando na rota: http://localhost:5000 ==\n'));
    console.log(colors.blue('============================================================'));
});