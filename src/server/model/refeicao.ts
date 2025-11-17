import { Ingrediente, JsonData, Nutrientes, PossuiCriador, TipoRefeicao } from "../util/interfaces";
import { Entidade } from "./entidade";
import { Receita } from "./receita";
import { Tag } from "./tag";

export class Refeicao extends Entidade implements PossuiCriador{

    
    nome: string;
    descricao: string;
    criador:string;
    tipo:TipoRefeicao;
    dataHora:Date;
    receitas:Array<Receita>; 
    ingredientes:Array<Ingrediente>;
    nutrientes:Nutrientes;
    imagem:string;
    tags:Array<Tag> = [];
    

    init(data:JsonData):Refeicao{
        super.init(data);
        this.nome = data.nome || null;
        this.descricao = data.descricao || null;
        this.criador = data.criador_id;
        this.tipo = data.tipo;
        this.dataHora = data.data_hora;
        this.receitas = data.receitas || [];
        this.ingredientes = data.ingredientes || [];
        this.nutrientes = data.nutrientes || {};
        this.imagem = data.imagem || null;
        return this;
    }



}