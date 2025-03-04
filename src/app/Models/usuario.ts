import { Atividade } from "./atividade";

export class Usuario {

  id: number | null;
  username: string;
  email: string;
  password: string;
  dataCriacao: string; 
  ultimoLogin: string; 
  role: string;
  atividades: Atividade[]; 

  constructor(
    id: number | null = null,
    username: string,
    email: string,
    password: string,
    dataCriacao: string,
    ultimoLogin: string,
    role: string,
    atividades: Atividade[] = []
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.dataCriacao = dataCriacao;
    this.ultimoLogin = ultimoLogin;
    this.role = role;
    this.atividades = atividades;
  }
}
