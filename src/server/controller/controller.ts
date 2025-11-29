import { Usuario, UsuarioGuest, UsuarioCadastrado } from "../model/usuario";
import { UsuarioDB } from "../service/usuario";
import permissoes from "../config/permissoes.json";
import { JsonData } from "../util/interfaces";
import { randomUUID } from "crypto";
import path from "path";
import { DB } from "../service/db";

export abstract class Controller {

    usuario:Usuario = null;
    db:DB;

    constructor(){}

    checkOwner():boolean{

        return false;
    }

    generateImageFileName(file: Express.Multer.File): string {
        const original: string = file.originalname;
        const ext: string = path.extname(original) || "";
        const randomName: string = randomUUID();
        return `${randomName}${ext}`;
    }

    validate(func:Function,data:JsonData=null):JsonData{

        return data;
    }


    async create(req,res,next):Promise<any> {
        
        
    }


    async update(req, res, next): Promise<any>{

        
    }


    async get(req, res, next): Promise<any>{

        
    }


    async list(req, res, next): Promise<any>{

        
    }

    async search(req,res,next):Promise<any>{
        
    }


    async delete(req, res, next): Promise<any>{

        
    }

    async updateImagem(req, res, next): Promise<any> {
        const id: string = req.params.id;      // ID vindo da rota

        if (!id) {
            res.send({ error: 'ID não informado.' });
            return;
        }


        if (!req.file) {
            res.send({ error: 'Imagem não enviada' });
            return;
        }

        let data: JsonData = {
            imagem: this.generateImageFileName(req.file)
        }

        try {
            let rs = await this.db.update(id, data, req.file || null);

            if (!rs) {
                res.send({ error: 'Erro ao atualizar a imagem.' });
                return;
            }

            res.send(rs);

        } catch (error) {
            console.log(error);
            res.send({ erro: error });
            return;
        }

    }


}