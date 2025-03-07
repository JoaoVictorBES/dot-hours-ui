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
  dataCriacao: string;
  ativo!: boolean;
  

  constructor(
    nome: string,
    descricao: string,
    dataInicio: string,
    dataFim: string,
    status: StatusAtividade,
    dataCriacao: string,
    ativo: boolean
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.status = status;
    this.dataCriacao = dataCriacao;
    this.ativo = ativo;
  }

  

}
