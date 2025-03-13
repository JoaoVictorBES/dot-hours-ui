import { StatusAtividade } from "../Enums/status-atividade.enum";
import { Projeto } from "./projeto";
import { Usuario } from "./usuario";

export class Atividade {

  id!: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  status: StatusAtividade;
  idUsuarioResponsavel!: number;
  idUsuariosVinculados!: number[];
  idProjetoVinculado!: number;
  nomeUsuarioResponsavel: string;
  dataCriacao: string;
  ativo!: boolean;
  

  constructor(
    nome: string,
    descricao: string,
    dataInicio: string,
    dataFim: string,
    status: StatusAtividade,
    dataCriacao: string,
    nomeUsuarioResponsavel: string,
    ativo: boolean
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.status = status;
    this.dataCriacao = dataCriacao;
    this.nomeUsuarioResponsavel = nomeUsuarioResponsavel;
    this.ativo = true;
  }

  

}
