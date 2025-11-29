import { DB } from "./db";
import { UsuarioCadastrado } from "../model/usuario";
import { JsonData } from '../util/interfaces';
import NodeCache  from 'node-cache';


export class UsuarioDB extends DB{


    async find(id:string):Promise<UsuarioCadastrado>{
        let res = await this.query("SELECT * FROM usuario WHERE id='" + id + "'");
        if (res.rows.length > 0) {
            //await this.redis.set('usuario:' + id, JSON.stringify(res.rows[0]));
            return (new UsuarioCadastrado()).init(res.rows[0]);
        }
        return null;
    }

    static async getFromCache(uid:string):Promise<UsuarioCadastrado>{
        const cache:NodeCache = new NodeCache();
        const cached: any = cache.get('usuario:'+uid);
        if (cached) {
            return (new UsuarioCadastrado()).init(JSON.parse(cached));
        }
        return null;
    }

    async getFromFirebase(uid:string):Promise<UsuarioCadastrado>{
        let res = await this.query("SELECT * FROM usuario WHERE firebase_uid='"+uid+"'");
        if(res.rows.length>0){
            const cache:NodeCache = new NodeCache();
            cache.set('usuario:' + uid, res.rows[0]);
            console.log(res.rows[0]);
            return (new UsuarioCadastrado()).init(res.rows[0]);
        }
        return null;
        
    }

    async checkUserData(field:string, value:string):Promise<boolean>{
        let res = await (this.query("SELECT *FROM usuario WHERE "+field+"='"+value+"'"));
        if (res.rows.length > 0) {
            return true;
        }
        return false;
    }

    async checkUser(userData:JsonData):Promise<boolean>{

        let res = await(this.query("SELECT * FROM usuario WHERE firebase_uid='"+userData.firebase_uid+"' OR email='"+userData.email+"' OR username='"+userData.username+"'"));
        if(res.rows.length>0){   
            return true;
        }
        return false;
    }

    async create(userData: JsonData, file?:Express.Multer.File):Promise<any>{

        const colunas = Object.keys(userData);

        const placeholders = colunas.map((_, i) => `$${i + 1}`);

        const vals = Object.values(userData);

        if(file){
            
        }

        const query = 'INSERT INTO usuario ('+colunas.join(', ')+') VALUES ('+placeholders.join(', ')+') RETURNING *;';

        try{
            const res = await this.pool.query(query,vals);
            return res.rows[0];

        } catch(err){
            console.log(err);
            return null;
        }

        return null;
    }

    async update(id: string, data: JsonData, file?: Express.Multer.File): Promise<any> {
        if(file){
            return await this.basicUpdateWithFile('usuario',id,data,file);
        } 
        return await this.basicUpdate('usuario', id, data);
    }



}