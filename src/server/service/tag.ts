import { DB } from "./db";
import { Tag } from "../model/tag";
import { JsonData } from "../util/interfaces";



export class TagDB extends DB{


    async find(id:string):Promise<Tag> {
        const res = await this.pool.query("SELECT * FROM alimento WHERE id='"+id+"'");
        if(res.rows.length>0){
            //return (new Alimento()).init(res.rows[0]);
        }
        return null;
    }


    async list(parent:string=null):Promise<Array<Tag>> {
        let ar: Array<Tag> = [];
        if(parent){
            let res = await this.pool.query("SELECT t.* FROM tags t JOIN taggings tg ON tg.tag_id = t.id WHERE tg.entity_type = 'alimento' AND tg.entity_id='"+parent+"'");
            for(let r of res.rows){
                ar.push((new Tag()).init(r));
            }
            return ar;
        }
        const res = await this.pool.query("SELECT * FROM tags");
        
        for(let r of res.rows){
            ar.push((new Tag()).init(r));
        }
        return ar;
    }

    async create(data:JsonData):Promise<Tag> {
        


        return null;
    }




}