import { Atividade } from "./atividade";

export class Usuario {

  id: number;
  nome: string;
  email: string;
  senha: string;
  dataCriacao: string; 
  ultimoLogin: string; 
  role: string;
  atividades: Atividade[]; 

  constructor(
    id: number,
    nome: string,
    email: string,
    senha: string,
    dataCriacao: string,
    ultimoLogin: string,
    role: string,
    atividades: Atividade[] = []
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCriacao = dataCriacao;
    this.ultimoLogin = ultimoLogin;
    this.role = role;
    this.atividades = atividades;
  }
}
