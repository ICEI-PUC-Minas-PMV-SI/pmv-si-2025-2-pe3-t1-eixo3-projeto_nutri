import { Ingrediente, JsonData, Nutrientes, PossuiCriador, TipoRefeicao } from "../util/interfaces";
import { Entidade } from "./entidade";
import { Receita } from "./receita";
import { Tag } from "./tag";

export class Refeicao extends Entidade implements PossuiCriador{

    
    nome: string; //null
    descricao: string; //null
    criador:string; //not null
    tipo:TipoRefeicao; //string not null
    dataHora:Date; //not null
    ingredientes:Array<Ingrediente>; //[]
    nutrientes:Nutrientes; //null
    imagem:string; //null
    tags:Array<Tag> = [];
    

    init(data:JsonData):Refeicao{
        super.init(data);
        this.nome = data.nome || null;
        this.descricao = data.descricao || null;
        this.criador = data.criador_id;
        this.tipo = data.tipo;
        this.dataHora = data.data_hora;
        this.ingredientes = data.ingredientes || [];
        this.nutrientes = data.nutrientes || {};
        this.imagem = data.imagem || null;
        return this;
    }



}