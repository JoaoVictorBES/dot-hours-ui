import { Atividade } from "./atividade";

export class Usuario {

  id: number;
  username: string;
  email: string;
  senha: string;
  dataCriacao: string; 
  ultimoLogin: string; 
  role: string;
  atividades: Atividade[]; 

  constructor(
    id: number,
    username: string,
    email: string,
    senha: string,
    dataCriacao: string,
    ultimoLogin: string,
    role: string,
    atividades: Atividade[] = []
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.senha = senha;
    this.dataCriacao = dataCriacao;
    this.ultimoLogin = ultimoLogin;
    this.role = role;
    this.atividades = atividades;
  }
}
