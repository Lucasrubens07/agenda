"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirCompromisso = exports.atualizarCompromisso = exports.adicionarCompromisso = exports.listarCompromissos = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const agendaPath = path_1.default.join(__dirname, '../data/agenda.json');
const lerAgenda = () => {
    const data = fs_1.default.readFileSync(agendaPath, 'utf-8');
    return JSON.parse(data);
};
const salvarAgenda = (dados) => {
    fs_1.default.writeFileSync(agendaPath, JSON.stringify(dados, null, 2));
};
const listarCompromissos = (req, res) => {
    const agenda = lerAgenda();
    res.json(agenda);
};
exports.listarCompromissos = listarCompromissos;
const adicionarCompromisso = (req, res) => {
    const { titulo, data, hora } = req.body;
    const agenda = lerAgenda();
    const novoCompromisso = {
        id: agenda.length > 0 ? agenda[agenda.length - 1].id + 1 : 1,
        titulo,
        data,
        hora,
    };
    agenda.push(novoCompromisso);
    salvarAgenda(agenda);
    res.status(201).json(novoCompromisso);
};
exports.adicionarCompromisso = adicionarCompromisso;
const atualizarCompromisso = (req, res) => {
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
exports.atualizarCompromisso = atualizarCompromisso;
const excluirCompromisso = (req, res) => {
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
exports.excluirCompromisso = excluirCompromisso;
