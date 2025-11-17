import { DB } from "./db";
import { Alimento } from "../model/alimento";
import { JsonData } from "../util/interfaces";



export class AlimentoDB extends DB{


    async find(id:string):Promise<Alimento> {
        const res = await this.pool.query("SELECT * FROM alimento_completo_view WHERE id='"+id+"'");
        if(res.rows.length>0){
            return (new Alimento()).init(res.rows[0]);
        }
        return null;
    }


    async list():Promise<Array<Alimento>> {
        const res = await this.pool.query("SELECT * FROM alimento_completo_view;");
        let ar:Array<Alimento> = [];
        for(let r of res.rows){
            ar.push((new Alimento()).init(r.data));
        }
        return ar;
    }

    async create(data:JsonData):Promise<Alimento> {
        


        return null;
    }




}