import express from "express";
import { UsuarioController } from "../controller/usuario";
import { Router } from "./router";
import upload from '../middleware/upload';


export class UsuarioRouter extends Router<UsuarioController> {
    

    
    init():express.Router{
        this.router = super.init();
        
        this.get('/:id', 'get', this.controller.check);

        this.get('/', 'get', this.controller.list);

        this.get('/check/:field/:id', 'check', this.controller.check);
        
        this.post('/register', 'create', [upload.single('imagem')], this.controller.create);

        this.put('/:id', 'update', [upload.single('imagem')], this.controller.update);

        this.post('/login', 'login', this.controller.login);

        this.post('/logout', 'logout', this.controller.logout);

        return this.router;

        
    }


}



const router = (new UsuarioRouter(new UsuarioController(),'usuario')).init();

export {router as usuarioRouter};



