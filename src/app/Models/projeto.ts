import { Usuario } from "./usuario";

export class Projeto {

  id: number;
  nome: string;
  descricao: string;
  dataInicio: string; 
  dataFim: string;
  status: string;
  idUsuarioResponsavel: number;
  dataCriacao: string; 
  prioridade: string;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    dataInicio: string,
    dataFim: string,
    status: string,
    idUsuarioResponsavel: number, 
    dataCriacao: string,
    prioridade: string
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.status = status;
    this.idUsuarioResponsavel = idUsuarioResponsavel;
    this.dataCriacao = dataCriacao;
    this.prioridade = prioridade;
  }

}
