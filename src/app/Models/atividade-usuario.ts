export class atividadeUsuario {

    id!: number;
    idUsuario!: number;
    idAtividade!: number;
    ativo!: boolean;

    constructor(
        id: number,
        idUsuario: number,
        idAtividade: number,
        ativo: boolean
    ) 
    
    {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idAtividade = idAtividade;
        this.ativo = ativo;
    }

}