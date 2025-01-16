import express from 'express';
import agendaRoutes from './routes/agenda';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/agenda', agendaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
