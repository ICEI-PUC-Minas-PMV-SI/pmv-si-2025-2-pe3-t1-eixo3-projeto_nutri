import {Pool,Client} from 'pg';
import { JsonData } from '../util/interfaces';
import { UUID } from 'crypto';
import { Entidade } from '../model/entidade';
import { createClient, RedisClientType } from 'redis';


export class DB {


    pool:Pool;
    client:Client;
    redis:RedisClientType;
    config:JsonData = {
        host: 'ep-proud-smoke-accvpbt7-pooler.sa-east-1.aws.neon.tech',
        port: 5432,
        user: 'neondb_owner',
        password: 'npg_mzDk09OJIbVU',
        database: 'neondb',
        ssl: true
    };

    constructor(config:JsonData=null){
        let conf:JsonData = config || this.config;
        this.pool = new Pool(conf);
        this.redis = createClient();

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

