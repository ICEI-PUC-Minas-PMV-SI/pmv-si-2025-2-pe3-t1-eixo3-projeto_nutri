import {Pool,Client} from 'pg';
import { JsonData } from '../util/interfaces';
import { Entidade } from '../model/entidade';
import { config } from "../config/db";
import fs from "fs/promises";
import path from "path";


export abstract class DB {


    pool:Pool;
    client:Client;
    
    constructor(){
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

    async update(id: string, data: JsonData, file?: Express.Multer.File): Promise<any> {}

    async basicUpdate(table: string, id: string, data: JsonData): Promise<any> {

        const colunas = Object.keys(data);
        if (colunas.length === 0) {
            console.log('Nenhum dado enviado para atualização.');
            return null;
        }

        const setClause = colunas.map((coluna, i) => `${coluna} = $${i + 1}`).join(', ');

        const vals = Object.values(data);

        // último placeholder é o ID no WHERE
        const query = `UPDATE ${table} SET ${setClause} WHERE id = $${colunas.length + 1} RETURNING *;`;

        try {
            const res = await this.pool.query(query, [...vals, id]);

            return res.rows[0];

        } catch (err) {
            console.log(err);
            return null;
        }
    }


    async basicUpdateWithFile(table:string, id: string, data: JsonData, file?: Express.Multer.File): Promise<any> {

        const colunas = Object.keys(data);
        if (colunas.length === 0) {
            console.log('Nenhum dado enviado para atualização.');
            return null;
        }

        const setClause = colunas.map((coluna, i) => `${coluna} = $${i + 1}`).join(', ');

        const vals = Object.values(data);

        // último placeholder é o ID no WHERE
        const query = `UPDATE ${table} SET ${setClause} WHERE id = $${colunas.length + 1} RETURNING *;`;

        try {
            const res = await this.pool.query(query, [...vals, id]);

            if (file) {
                if (!this.saveUploadedFile(file, data.imagem)) {
                    console.log('erro ao salvar imagem');
                }
            }

            return res.rows[0];

        } catch (err) {
            console.log(err);
            return null;
        }
    }

    

    


}

