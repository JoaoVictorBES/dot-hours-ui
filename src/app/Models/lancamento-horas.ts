import { Atividade } from "./atividade";
import { Usuario } from "./usuario";

export class LancamentoHoras {

        id!: number;
        idAtividade: number | Atividade;
        idUsuario: number | Usuario;
        descricao: string;
        dataInicio: string; 
        dataFim: string;
        dataRegistro: string;
        tempoDuracao: string;
      
        constructor(
          id: number,
          idAtividade: number,
          idUsuario: number,
          descricao: string,
          dataInicio: string,
          dataFim: string,
          dataRegistro: string,
          tempoDuracao: string
        ) {
          this.id = id;
          this.idAtividade = idAtividade;
          this.idUsuario = idUsuario;
          this.descricao = descricao;
          this.dataInicio = dataInicio;
          this.dataFim = dataFim;
          this.dataRegistro = dataRegistro;
          this.tempoDuracao = tempoDuracao;
        }

}
