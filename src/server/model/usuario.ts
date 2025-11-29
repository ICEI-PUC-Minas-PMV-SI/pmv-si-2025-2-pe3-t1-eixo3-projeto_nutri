import { JsonData } from "../util/interfaces";
import {Entidade} from "./entidade";

export abstract class Usuario extends Entidade{

    roles:Array<string> = [];

    init(data:JsonData):Usuario{
        super.init(data);
        this.roles = data.roles;
        return this;
    }

    json():JsonData{
        let js = super.json();
        js.roles = this.roles;
        return js;
    }
}


export class UsuarioGuest extends Usuario {

    
    init(data:JsonData):UsuarioGuest{
        this.id = null;
        this.roles = ['guest'];
        return this;
    }


}


export interface Objetivos {
    peso:number;
    altura:number;
    genero:string;
    idade:number;
    pesoIdeal:number;
    calorias:number;
    consumoAgua:number;
}


export class UsuarioCadastrado extends Usuario {

    nome: string; //not null
    sobrenome: string; //null
    username:string; //not null unique
    descricao: string; //null
    email: string; //not null
    firebaseUid: string; //not null
    imagem:string; //null
    crn:string; //null
    dados:Objetivos;


    init(data:JsonData):UsuarioCadastrado{
        super.init(data);
        this.nome = data.nome;
        this.sobrenome = data.sobrenome || null;
        this.descricao = data.descricao || null;
        this.email = data.email;
        this.firebaseUid = data.firebase_uid;
        this.imagem = data.imagem || null;
        this.username = data.username;
        this.crn = data.crn || null;
        this.dados = data.dados || null;
        return this;
    }

    json():JsonData{
        let js = super.json();
        js.nome = this.nome;
        js.sobrenome = this.sobrenome;
        js.descricao = this.descricao;
        js.email = this.email;
        js.firebase_uid = this.firebaseUid;
        js.imagem = this.imagem;
        js.username = this.username;
        js.crn = this.crn;
        js.dados = this.dados;
        return js;
    }


}