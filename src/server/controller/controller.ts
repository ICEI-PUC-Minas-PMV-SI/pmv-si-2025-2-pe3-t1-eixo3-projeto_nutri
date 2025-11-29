import { Usuario, UsuarioGuest, UsuarioCadastrado } from "../model/usuario";
import { UsuarioDB } from "../service/usuario";
import permissoes from "../config/permissoes.json";
import { JsonData } from "../util/interfaces";
import { randomUUID } from "crypto";
import path from "path";

export abstract class Controller {

    usuario:Usuario = null;

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

    async uploadImagem(req, res, next): Promise<any> {
        

    }


}