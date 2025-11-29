import express from "express";
import { Router } from "./router";
import { ReceitaController } from "../controller/receita";


export class ReceitaRouter extends Router<ReceitaController> {

    init():express.Router{
        this.router = super.init();

        this.get('/', 'list', this.controller.list);

        this.post('/imagem/:id', 'upload', this.controller.uploadImagem);

        return this.router;
            
    }

}



const router:express.Router = (new ReceitaRouter(new ReceitaController(),'receita')).init();

export {router as receitaRouter};