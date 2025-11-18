import {Pool,Client} from 'pg';
import { JsonData } from '../util/interfaces';
import { UUID } from 'crypto';
import { Entidade } from '../model/entidade';
import config from "../config/db.json";

export class DB {


    pool:Pool;
    client:Client;
    
    constructor(){
        let conf: JsonData = config;
        this.pool = new Pool(conf);
        
    }

    async query(qr:string):Promise<any>{
        const res = await this.pool.query(qr);
        return res;
    }

    async get(id:UUID, table:string):Promise<Entidade>{
        const res = await this.pool.query("SELECT * FROM "+table+" WHERE id="+id);
        if(res.rows.length>0){
            return (new Entidade()).init(res.rows[0]);
        }

        return null;
    }

    


}

