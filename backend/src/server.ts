import express from 'express';
import cors from 'cors';
import { connectDB } from './infrastructure/database/connection';
import userRoutes from './presentation/routes/userRoutes';
import eventRoutes from './presentation/routes/eventRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', eventRoutes);

app.get('/', (_req, res) => {
  res.send('Servidor de VigilaMed funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});