import { JsonData } from "../util/interfaces";

export class Entidade {

    id:string;
    ativo:boolean;


    init(data:JsonData):Entidade{
        this.id = data.id || null;
        this.ativo = data.status || true;
        return this;
    }

    json():JsonData{
        let js:JsonData = {
            id: this.id,
            ativo: this.ativo  
        }
        return js;
    }





}