import express from "express";
import { Controller } from "../controller/controller";
import { Usuario, UsuarioGuest, UsuarioCadastrado } from "../model/usuario";
import { UsuarioDB } from "../service/usuario";
import permissoes from "../config/permissoes.json";
import type { Request, Response, NextFunction, RequestHandler } from "express";


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
            this.controller.usuario = this.usuario;
            return true;
        }
        if(req.user.tipo == 'logado'){
            let cached:UsuarioCadastrado = await UsuarioDB.getFromCache(req.user.id);
            if(cached){
                this.usuario = cached;
                this.controller.usuario = this.usuario;
                return true;
            }
            let usuarioDB = new UsuarioDB();
            this.usuario = await usuarioDB.getFromFirebase(req.user.uid) as UsuarioCadastrado;
            if(!this.usuario){
                return false;
            }
            this.controller.usuario = this.usuario;
            return true;
        }
    }

    async checkPermission(recurso: string, action: string, req, res, next): Promise<boolean> {
        if (!await this.checkAuthentication(req, res, next)) {
            return false;
        }
        return true;
        return permissoes.some(p =>
            p.recurso === recurso &&
            p.acao === action &&
            this.usuario.roles.includes(p.role)
        );

    }

    checkAuthorization(action:string):RequestHandler{
        return async (req: Request, res: Response, next: NextFunction) => {
            if (!await this.checkPermission(this.rota, action, req, res, next)) {
                return res.status(403).send({ error: 'Permissão negada.' });
            }
            // se chegou aqui, tem permissão
            return next();
        };
    }

    get(route:string,action:string,func:Function):void {
        this.router.get(route, this.checkAuthorization(action),(req,res,next) => func.call(this.controller, req,res, next) );
        //this.router.get(route, (req, res, next) => {this.checkAuthorization(action, func, req, res, next); });
    }

    post(route: string, action: string, middleware:any, func?: Function): void {
        if(func){
            this.router.post(route, this.checkAuthorization(action), ...(middleware as express.RequestHandler[]), (req, res, next) => func.call(this.controller, req, res, next));    
            return;
        }
        this.router.post(route, this.checkAuthorization(action), (req, res, next) => middleware.call(this.controller, req, res, next));
    }

    put(route: string, action: string, middleware: any, func?: Function): void {
        if (func) {
            this.router.put(route, this.checkAuthorization(action), ...(middleware as express.RequestHandler[]), (req, res, next) => func.call(this.controller, req, res, next));
            return;
        }
        this.router.put(route, this.checkAuthorization(action), (req, res, next) => middleware.call(this.controller, req, res, next));
    }

    delete(route: string, action: string, middleware: any, func?: Function): void {
        if (func) {
            this.router.delete(route, this.checkAuthorization(action), ...(middleware as express.RequestHandler[]), (req, res, next) => func.call(this.controller, req, res, next));
            return;
        }
        this.router.delete(route, this.checkAuthorization(action), (req, res, next) => middleware.call(this.controller, req, res, next));
    }


    init():express.Router{

        //this.router.get('/', (req,res,next)=>{this.checkAuthorization('list',this.controller.list,req,res,next);});

        this.get('/:id','get', this.controller.get);

        //this.router.get('/search/:term', (req, res, next) => {this.checkAuthorization('search', this.controller.search, req, res, next); });
        
        //this.router.post('/', (req, res, next) => {this.checkAuthorization('create', this.controller.create, req, res, next); });

        //this.put('/:id', 'update', this.controller.update);

        this.delete('/:id', 'delete', this.controller.delete);
        
        return this.router;
    }

}