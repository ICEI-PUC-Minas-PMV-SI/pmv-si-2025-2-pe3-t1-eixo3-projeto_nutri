import {Pool,Client} from 'pg';
import { JsonData } from '../util/interfaces';
import { Entidade } from '../model/entidade';
import { config } from "../config/db";
import fs from "fs/promises";
import path from "path";


export class DB {


    pool:Pool;
    client:Client;
    
    constructor(){
        console.log(config);
        let conf: JsonData = config;
        this.pool = new Pool(conf);
        
    }

    async saveUploadedFile(file: Express.Multer.File, filename: string): Promise<boolean> {
        const uploadDir: string = path.join(__dirname, "uploads");
        const filePath: string = path.join(uploadDir, filename);

        try{
            await fs.writeFile(filePath, file.buffer);
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }
    }

    async query(qr:string):Promise<any>{
        const res = await this.pool.query(qr);
        return res;
    }

    async get(id:string, table:string):Promise<Entidade>{
        const res = await this.pool.query("SELECT * FROM "+table+" WHERE id="+id);
        if(res.rows.length>0){
            return (new Entidade()).init(res.rows[0]);
        }

        return null;
    }

    


}

