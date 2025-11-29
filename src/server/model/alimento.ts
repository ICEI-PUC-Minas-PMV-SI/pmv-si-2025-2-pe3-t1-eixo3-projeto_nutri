import { UUID } from "crypto";
import { Dict, EstadoAlimento, JsonData, Nutrientes, PossuiCriador } from "../util/interfaces";
import { Entidade } from "./entidade";
import { Receita } from "./receita";
import { Tag } from "./tag";

export class Alimento extends Entidade implements PossuiCriador{

    nome:string;
    descricao:string;
    criador:string = null;
    receita:string = null;
    categoria:string;
    subcategoria:string;
    imagem:string;
    nutrientes:Nutrientes;
    estado:EstadoAlimento;
    modificadores:Array<string> = [];
    tags:Array<Tag> = [];
    

    init(data:JsonData):Alimento{
        super.init(data);
        this.nome = data.data.nome;
        this.descricao = data.data.descricao || null;
        this.criador = data.data.criador_id || null;
        this.categoria = data.data.categoria || null;
        this.subcategoria = data.data.subcategoria || null;
        this.imagem = data.data.imagem || null;
        this.nutrientes = data.data.nutrientes || null;
        this.estado = data.data.estado || null;
        this.receita = data.data.receita || null;
        this.tags = data.data.tags || [];
        return this;
    }

    json(): JsonData {
        let js:JsonData = super.json();
        js.nome = this.nome;
        js.descricao = this.descricao;
        js.criador_id = this.criador;
        js.categoria = this.categoria;
        js.subcategoria = this.subcategoria;
        js.imagem = this.imagem;
        js.nutrientes = this.nutrientes;
        js.estado = this.estado;
        js.receita = this.receita;
        let tg = [];
        for(let t of this.tags){
            tg.push(t.id);
        }
        js.tags = tg;
        return js;
    }


}




export class FatorPreparo {

    tipo:EstadoAlimento;
    fatorPeso: number; //porcentagem que aumenta ou diminui
    variacaoEnergetica: number; //porcentagem que aumenta ou diminui

}

