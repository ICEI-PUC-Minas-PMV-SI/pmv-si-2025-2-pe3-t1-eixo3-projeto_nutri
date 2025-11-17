import { DB } from "./db";
import { Receita } from "../model/receita";
import { JsonData } from "../util/interfaces";


export class ReceitaDB extends DB{


    async find(id:string):Promise<Receita> {

        const res = await this.pool.query("SELECT * FROM receita_completa_view WHERE id = '"+id+"';");
        if(res.rows.length>0){
            return (new Receita()).init(res.rows[0]);
        }
        return null;
    }


    async list():Promise<Array<Receita>> {
        const res = await this.pool.query("SELECT * FROM receita_completa_view;");
        let ar:Array<Receita> = [];
        for(let r of res.rows){
            ar.push((new Receita()).init(r));
        }
        return ar;
    }

    async create(data:JsonData):Promise<Receita> {
        


        return null;
    }

    async update(data:JsonData):Promise<Receita>{
        //atualizar no banco
        //atualizar no redis
        //atualizar VIEW


        return null;
    }




}