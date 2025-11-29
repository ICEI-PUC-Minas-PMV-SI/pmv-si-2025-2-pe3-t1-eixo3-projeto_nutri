import express from 'express';
import cors from 'cors';
import path from 'path';
import { auth } from './middleware/auth';
import { usuarioRouter } from './route/usuario';
import { alimentoRouter } from './route/alimento';
import { receitaRouter } from './route/receita';
import { refeicaoRouter } from './route/refeicao';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(auth.checkAuth);
app.use(express.static('public'));
app.use('/api/usuario', usuarioRouter);
app.use('/api/alimento', alimentoRouter);
app.use('/api/receita', receitaRouter);
app.use('/api/refeicao', refeicaoRouter);


app.get('/', (req:any, res:any) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname,'public/index.html'));
});

app.get('/register', (req: any, res: any) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.get('/login', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
