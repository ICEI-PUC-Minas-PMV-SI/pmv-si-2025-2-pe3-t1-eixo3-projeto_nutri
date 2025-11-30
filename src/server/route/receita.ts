import express from "express";
import { Router } from "./router";
import { ReceitaController } from "../controller/receita";
import upload from "../middleware/upload";


export class ReceitaRouter extends Router<ReceitaController> {

    init():express.Router{
        this.router = super.init();

        

        this.get('/usuario/:id', 'list_usuario', this.controller.listUsuario);

        this.get('/:id', 'get', this.controller.get);

        this.get('/', 'list', this.controller.list);

        this.post('/imagem/:id', 'upload', this.controller.updateImagem);

        this.post('/', 'create', [upload.single('imagem')], this.controller.create);

        this.put('/:id', 'update', [upload.single('imagem')], this.controller.update);

        return this.router;
            
    }

}



const router:express.Router = (new ReceitaRouter(new ReceitaController(),'receita')).init();

export {router as receitaRouter};