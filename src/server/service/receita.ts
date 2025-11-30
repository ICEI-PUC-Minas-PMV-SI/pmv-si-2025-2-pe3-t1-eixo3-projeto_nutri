import { DB } from "./db";
import { Receita } from "../model/receita";
import { JsonData } from "../util/interfaces";


export class ReceitaDB extends DB{


    async find(id:string):Promise<Receita> {

        const res = await this.pool.query("SELECT * FROM receita_completa_view WHERE id = '"+id+"';");
        if(res.rows.length>0){
            return (new Receita()).init(res.rows[0].data);
        }
        return null;
    }


    async list(criador?:string):Promise<Array<Receita>> {
        let query:string = "SELECT * FROM receita_completa_view;";
        if(criador){
            `SELECT * FROM receita_completa_view WHERE data->>'criador' = ${criador};`
        }
        const res = await this.pool.query(query);
        let ar:Array<Receita> = [];
        for(let r of res.rows){
            ar.push((new Receita()).init(r.data));
        }
        return ar;
    }

    async create(data: JsonData, file?: Express.Multer.File): Promise<any> {
        
        


        return null;
    }

    async update(id: string, data: JsonData, file?: Express.Multer.File): Promise<any> {
        //atualizar no banco
        //atualizar no redis
        //atualizar VIEW


        return null;
    }




}