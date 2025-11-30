import express from "express";
import { UsuarioController } from "../controller/usuario";
import { Router } from "./router";
import upload from '../middleware/upload';


export class UsuarioRouter extends Router<UsuarioController> {
    

    
    init():express.Router{
        this.router = super.init();
        
        this.get('/me', 'me', this.controller.currentUser);

        this.get('/', 'list', this.controller.list);

        this.get('/:id', 'get', this.controller.get);
        
        this.get('/check/:field/:value', 'check', this.controller.check);
        
        this.post('/register', 'create', [upload.single('imagem')], this.controller.create);

        this.post('/login', 'login', this.controller.login);

        this.post('/logout', 'logout', this.controller.logout);
        
        this.put('/credenciais/:id', 'credenciais', this.controller.updateDados);

        this.put('/dados/:id', 'dados', this.controller.updateDados);

        this.put('/imagem/:id', 'upload', [upload.single('imagem')], this.controller.updateImagem);

        this.put('/:id', 'update', [upload.single('imagem')], this.controller.update);
        

        return this.router;

        
    }


}



const router = (new UsuarioRouter(new UsuarioController(),'usuario')).init();

export {router as usuarioRouter};



