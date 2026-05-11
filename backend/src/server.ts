import express from 'express';
import cors from 'cors';
import { connectDB } from './infrastructure/database/connection';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la Base de Datos
connectDB();

app.get('/', (req, res) => {
  res.send('Servidor de VigilaMed funcionando ');
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});