import express from "express";
import { Controller } from "../controller/controller";
import { Usuario, UsuarioGuest, UsuarioCadastrado } from "../model/usuario";
import { UsuarioDB } from "../service/usuario";
import permissoes from "../config/permissoes.json";


export class Router<TypeController extends Controller = Controller> {

    controller: TypeController;
    router:express.Router;
    rota:string;
    usuario:Usuario;

    constructor(controller: TypeController,rota:string=null){
        this.controller = controller;
        this.router = express.Router();
        this.rota = rota;
    }

    async checkAuthentication(req:any,res:any,next:any):Promise<boolean>{
        if(!req.user){
            return false;
        }
        if(req.user.tipo == 'convidado'){
            //console.log('convidado');
            this.usuario = (new UsuarioGuest()).init(null);
            return true;
        }
        if(req.user.tipo == 'logado'){
            let cached:UsuarioCadastrado = await UsuarioDB.getFromCache(req.user.id);
            if(cached){
                this.usuario = cached;
                return true;
            }
            let usuarioDB = new UsuarioDB();
            this.usuario = await usuarioDB.getFromFirebase(req.user.uid) as UsuarioCadastrado;
            if(!this.usuario){
                return false;
            }
            return true;
        }
    }

    async checkPermission(recurso: string, action: string, req, res, next): Promise<boolean> {
        if (!await this.checkAuthentication(req, res, next)) {
            return false;
        }
        return permissoes.some(p =>
            p.recurso === recurso &&
            p.acao === action &&
            this.usuario.roles.includes(p.role)
        );

    }

    async checkAuthorization(action:string,func:Function,req,res,next):Promise<any>{
        //console.log(this.rota+' '+action);
        if(!await this.checkPermission(this.rota,action,req,res,next)){
            res.send({ error: 'Permissão negada.' });
            return;
        }
        func.call(this.controller, req,res,next);
        return;
    }

    get(route:string,action:string,func:Function):void {
        this.router.get(route, (req, res, next) => {this.checkAuthorization(action, func, req, res, next); });
    }

    post(route: string, action: string, func: Function): void {
        this.router.post(route, (req, res, next) => { this.checkAuthorization(action, func, req, res, next); });
    }

    put(route: string, action: string, func: Function): void {
        this.router.put(route, (req, res, next) => { this.checkAuthorization(action, func, req, res, next); });
    }

    delete(route: string, action: string, func: Function): void {
        this.router.delete(route, (req, res, next) => { this.checkAuthorization(action, func, req, res, next); });
    }


    init():express.Router{

        //this.router.get('/', (req,res,next)=>{this.checkAuthorization('list',this.controller.list,req,res,next);});

        this.get('/:id','get', this.controller.get);

        //this.router.get('/search/:term', (req, res, next) => {this.checkAuthorization('search', this.controller.search, req, res, next); });
        
        //this.router.post('/', (req, res, next) => {this.checkAuthorization('create', this.controller.create, req, res, next); });

        this.put('/:id', 'update', this.controller.update);

        this.delete('/:id', 'delete', this.controller.delete);
        
        return this.router;
    }

}