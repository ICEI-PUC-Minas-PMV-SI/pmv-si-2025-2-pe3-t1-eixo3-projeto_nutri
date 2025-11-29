import { PossuiCriador, JsonData, Nutrientes } from "../util/interfaces";
import {Entidade} from "./entidade";
import { Ingrediente } from "../util/interfaces";
import { Tag } from "./tag";

export class Receita extends Entidade implements PossuiCriador{

    nome: string;
    descricao: string;
    modoPreparo: string;
    alimento:string;
    nutrientes: Nutrientes;
    imagem: string;
    tempoPreparo: number; //min
    criador:string;
    ingredientesEntrada:Array<Ingrediente> = [];
    ingredientesFinais:Array<Ingrediente> = [];
    tags:Array<Tag> = [];
    

    init(data:JsonData):Receita{
        super.init(data);
        this.criador = data.criador_id || null;
        this.alimento = data.alimento || null;
        this.nome = data.nome;
        this.descricao = data.descricao || null;
        this.modoPreparo = data.modo_preparo || null;
        this.nutrientes = data.nutrientes || {};
        this.imagem = data.imagem || null;
        this.tempoPreparo = data.tempo_preparo || null;
        this.ingredientesEntrada = data.ingredientes_entrada || [];
        this.ingredientesFinais = data.ingredientes_finais || [];
        return this;
    }

    json():JsonData {
        let js:JsonData = super.json();
        js.nome = this.nome;
        js.descricao = this.descricao;
        js.modo_preparo = this.modoPreparo;
        js.alimento = this.alimento;
        js.nutrientes = this.nutrientes;
        js.imagem = this.imagem;
        js.tempo_preparo = this.tempoPreparo;
        js.criador_id = this.criador;
        js.ingredientes_entrada = this.ingredientesEntrada;
        js.ingredientes_finais = this.ingredientesFinais;
        return js;

    }

    


}
