import { Router } from 'express';
import {
  listarCompromissos,
  adicionarCompromisso,
  atualizarCompromisso,
  excluirCompromisso,
} from '../controllers/agendaController';

const router = Router();

router.get('/', listarCompromissos);
router.post('/', adicionarCompromisso);
router.put('/:id', atualizarCompromisso);
router.delete('/:id', excluirCompromisso);

export default router;
