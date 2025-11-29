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
            ar.push((new Alimento()).init(r));
        }
        return ar;
    }

    async search(term:string): Promise<Array<JsonData>> {
        const res = await this.pool.query(
            `SELECT id, nome FROM public.alimento WHERE (nome ILIKE '%' || $1 || '%' OR similarity(nome, $1) > 0.25) AND ativo = true ORDER BY similarity(nome, $1) DESC LIMIT $2 OFFSET $3;`,
            [term, 10, 0]
        );
        return res.rows || [];
    }

    async create(data:JsonData, file?:Express.Multer.File):Promise<any> {

        const colunas = Object.keys(data);

        const placeholders = colunas.map((_, i) => `$${i + 1}`);

        const vals = Object.values(data);

        const query = 'INSERT INTO alimento (' + colunas.join(', ') + ') VALUES (' + placeholders.join(', ') + ') RETURNING *;';

        try {
            const res = await this.pool.query(query, vals);

            if(file){
                if(!this.saveUploadedFile(file,data.imagem)){
                    console.log('erro ao salvar imagem');
                }
            }

            return res.rows[0];

        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async update(id: string, data: JsonData, file?: Express.Multer.File): Promise<any> {

        return await this.basicUpdateWithFile('alimento', id, data, file);
    }





}