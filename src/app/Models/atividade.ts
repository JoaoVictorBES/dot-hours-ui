import { Projeto } from "./projeto";
import { Usuario } from "./usuario";

export class Atividade {

  id!: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  status: string;
  idUsuarioResponsavel!: number;
  idUsuariosVinculados!: number[];
  idProjetoVinculado!: number;
  dataCriacao: string;
  

  constructor(
    nome: string,
    descricao: string,
    dataInicio: string,
    dataFim: string,
    status: string,
    dataCriacao: string,
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.status = status;
    this.dataCriacao = dataCriacao;
  }

}
