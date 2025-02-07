import { Atividade } from "./atividade";
import { Usuario } from "./usuario";

export class LancamentoHoras {

        id: number;
        atividade: Atividade; 
        usuario: Usuario; 
        descricao: string;
        dataInicio: string; 
        dataFim: string;
        dataRegistro: string;
      
        constructor(
          id: number,
          atividade: Atividade,
          usuario: Usuario,
          descricao: string,
          dataInicio: string,
          dataFim: string,
          dataRegistro: string
        ) {
          this.id = id;
          this.atividade = atividade;
          this.usuario = usuario;
          this.descricao = descricao;
          this.dataInicio = dataInicio;
          this.dataFim = dataFim;
          this.dataRegistro = dataRegistro;
        }

}
