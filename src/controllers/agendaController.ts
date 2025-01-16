import { Request, Response } from 'express';
import { Compromisso } from '../models/compromisso';
import fs from 'fs';
import path from 'path';

const agendaPath = path.join(__dirname, '../data/agenda.json');


const lerAgenda = (): Compromisso[] => {
    const data = fs.readFileSync(agendaPath, 'utf-8');
    return JSON.parse(data) as Compromisso[];
};


const salvarAgenda = (dados: Compromisso[]) => {
    fs.writeFileSync(agendaPath, JSON.stringify(dados, null, 2));
};

export const listarCompromissos = (req: Request, res: Response) => {
    const agenda = lerAgenda();
    res.json(agenda);
};

export const adicionarCompromisso = (req: Request, res: Response) => {
    const { titulo, data, hora } = req.body;
    const agenda = lerAgenda();

    const novoCompromisso: Compromisso = {
        id: agenda.length > 0 ? agenda[agenda.length - 1].id + 1 : 1,
        titulo,
        data,
        hora,
    };

    agenda.push(novoCompromisso);
    salvarAgenda(agenda);

    res.status(201).json(novoCompromisso);
};

export const atualizarCompromisso = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { titulo, data, hora } = req.body;

    const agenda = lerAgenda();
    const index = agenda.findIndex((compromisso) => compromisso.id === parseInt(id));

    if (index === -1) {
        res.status(404).json({ error: 'Compromisso não encontrado' });
        return;
    }

    agenda[index] = { id: parseInt(id), titulo, data, hora };
    salvarAgenda(agenda);

    res.json(agenda[index]);
};

export const excluirCompromisso = (req: Request, res: Response): void => {
    const { id } = req.params;

    const agenda = lerAgenda();
    const novaAgenda = agenda.filter((compromisso) => compromisso.id !== parseInt(id));

    if (agenda.length === novaAgenda.length) {
        res.status(404).json({ error: 'Compromisso não encontrado' });
        return;
    }

    salvarAgenda(novaAgenda);
    res.json({ message: 'Compromisso excluído com sucesso' });
};
