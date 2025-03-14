import { Atividade } from "./atividade";


export class Projeto {

  id: number;
  nome: string;
  descricao: string;
  dataInicio: string; 
  dataFim: string;
  status: string;
  idUsuarioResponsavel: number;
  nomeUsuarioResponsavel: string;
  dataCriacao: string; 
  prioridade: string;
  atividades: Atividade[];

  constructor(
    id: number,
    nome: string,
    descricao: string,
    dataInicio: string,
    dataFim: string,
    status: string,
    idUsuarioResponsavel: number, 
    nomeUsuarioResponsavel: string,
    dataCriacao: string,
    prioridade: string,
    atividades: Atividade[]
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.status = status;
    this.idUsuarioResponsavel = idUsuarioResponsavel;
    this.nomeUsuarioResponsavel = nomeUsuarioResponsavel;
    this.dataCriacao = dataCriacao;
    this.prioridade = prioridade;
    this.atividades = atividades;
  }

}
