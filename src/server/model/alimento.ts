import { UUID } from "crypto";
import { Dict, EstadoAlimento, JsonData, Nutrientes, PossuiCriador } from "../util/interfaces";
import { Entidade } from "./entidade";
import { Receita } from "./receita";
import { Tag } from "./tag";

export class Alimento extends Entidade implements PossuiCriador{

    nome:string;
    descricao:string;
    criador:string = null;
    categoria:string;
    subcategoria:string;
    imagem:string;
    nutrientes:Nutrientes;
    estado:EstadoAlimento;
    modificadores:Array<string> = [];
    tags:Array<Tag> = [];
    

    init(data:JsonData):Alimento{
        super.init(data);
        this.nome = data.nome;
        this.descricao = data.descricao || null;
        this.criador = data.criador_id || null;
        this.categoria = data.categoria || null;
        this.subcategoria = data.subcategoria || null;
        this.imagem = data.imagem || null;
        this.nutrientes = data.nutrientes || null;
        this.estado = data.estado || null;
        this.modificadores = data.modificadores || [];
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
        js.modificadores = this.modificadores;
        let tg = [];
        for(let t of this.tags){
            tg.push(t.id);
        }
        js.tags = tg;
        return js;
    }


}


export class AlimentoPreparado extends Alimento {

    receita:Receita;


}








export class FatorPreparo {

    tipo:EstadoAlimento;
    fatorPeso: number; //porcentagem que aumenta ou diminui
    variacaoEnergetica: number; //porcentagem que aumenta ou diminui

}

