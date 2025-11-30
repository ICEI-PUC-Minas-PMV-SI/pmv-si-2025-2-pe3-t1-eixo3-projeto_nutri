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


    async list(params?:JsonData):Promise<Array<JsonData>> {
        let query = 'SELECT r.id,public.get_refeicao_completa(r.id) AS data FROM public.refeicao r WHERE r.ativo = TRUE ORDER BY r.data_hora DESC;';
        
        const values: any[] = [];
        let idx = 1;

        if (params) {
            // id é garantido quando params existe
            query += ` AND r.criador = $${idx++}`;
            values.push(params.id);

            if (params.diaInicial && !params.diaFinal) {
                const diaInicial = new Date(params.diaInicial);
                const nextDay = new Date(diaInicial);
                nextDay.setDate(nextDay.getDate() + 1);

                query += ` AND r.data_hora >= $${idx++} AND r.data_hora < $${idx++}`;
                values.push(diaInicial);
                values.push(nextDay);
            }
            if (params.diaFinal) {
                query += ` AND r.data_hora BETWEEN $${idx++} AND $${idx++}`;
                values.push(params.diaInicial);
                values.push(params.diaFinal);
            }
            
        }

        query += ` ORDER BY r.data_hora DESC;`;
        const res = await this.pool.query(query);
        let ar:Array<JsonData> = [];
        for(let r of res.rows){
            ar.push(((new Refeicao()).init(r.data)).json());
        }
        return ar;
    }

    async create(data: JsonData, file?: Express.Multer.File): Promise<any> {

        const colunas = Object.keys(data);

        const placeholders = colunas.map((_, i) => `$${i + 1}`);

        const vals = Object.values(data);

        const query = 'INSERT INTO refeicao (' + colunas.join(', ') + ') VALUES (' + placeholders.join(', ') + ') RETURNING *;';

        try {
            const res = await this.pool.query(query, vals);

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

    async update(id: string, data: JsonData, file?: Express.Multer.File): Promise<any> {

        return await this.basicUpdateWithFile('refeicao', id, data, file);
    }







}