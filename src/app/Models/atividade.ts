import { Projeto } from "./projeto";
import { Usuario } from "./usuario";

export class Atividade {

  id: number;
  projeto: Projeto;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  status: string;
  usuarioResponsavel: Usuario;
  dataCriacao: Date;
  usuarios: Usuario[];

  constructor(
    id: number,
    projeto: Projeto,
    nome: string,
    descricao: string,
    dataInicio: Date,
    dataFim: Date,
    status: string,
    usuarioResponsavel: Usuario,
    dataCriacao: Date,
    usuarios: Usuario[]
  ) {
    this.id = id;
    this.projeto = projeto;
    this.nome = nome;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.status = status;
    this.usuarioResponsavel = usuarioResponsavel;
    this.dataCriacao = dataCriacao;
    this.usuarios = usuarios;
  }

}
