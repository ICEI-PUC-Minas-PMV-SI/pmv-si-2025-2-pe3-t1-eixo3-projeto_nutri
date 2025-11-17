import { JsonData } from "../util/interfaces";
import { Entidade } from "./entidade";


export class Tag extends Entidade {

    nome:string;
    slug:string;


    init(data:JsonData):Tag{
        super.init(data);
        this.nome = data.nome;
        this.slug = data.slug;
        return this;
    }



}