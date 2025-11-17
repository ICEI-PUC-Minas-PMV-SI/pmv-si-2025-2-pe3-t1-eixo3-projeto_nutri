import { Usuario, UsuarioGuest, UsuarioCadastrado } from "../model/usuario";
import { UsuarioDB } from "../service/usuario";
import permissoes from "../config/permissoes.json";
import { JsonData } from "../util/interfaces";


export abstract class Controller {

    usuario:Usuario = null;

    constructor(){}

    checkOwner():boolean{

        return false;
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

    async upload(req, res, next): Promise<any> {


    }


}