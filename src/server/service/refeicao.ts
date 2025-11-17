import { DB } from "./db";
import { Refeicao } from "../model/refeicao";
import { JsonData } from "../util/interfaces";



export class RefeicaoDB extends DB{


    async find(id:string):Promise<Refeicao> {
        const res = await this.pool.query("SELECT * FROM refeicao WHERE id='"+id+"'");
        if(res.rows.length>0){
            return (new Refeicao()).init(res.rows[0]);
        }
        return null;
    }


    async list():Promise<Array<Refeicao>> {
        const res = await this.pool.query("SELECT a.*, COALESCE( jsonb_agg(DISTINCT jsonb_build_object('id', t.id, 'slug', t.slug, 'nome', t.nome)) FILTER (WHERE t.id IS NOT NULL),'[]'::jsonb) AS tags FROM refeicao a LEFT JOIN taggings tg ON tg.entity_type = 'refeicao' AND tg.entity_id = a.id LEFT JOIN tags t ON t.id = tg.tag_id GROUP BY a.id;");
        let ar:Array<Refeicao> = [];
        for(let r of res.rows){
            ar.push((new Refeicao()).init(r));
        }
        return ar;
    }

    async create(data:JsonData):Promise<Refeicao> {
        


        return null;
    }




}