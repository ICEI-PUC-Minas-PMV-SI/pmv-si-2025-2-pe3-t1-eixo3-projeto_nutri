import express from "express";
import { Router } from "./router";
import { RefeicaoController } from "../controller/refeicao";


export class RefeicaoRouter extends Router<RefeicaoController> {

    init():express.Router{
        this.router = super.init();

        this.get('/', 'list', this.controller.list);

        this.post('/upload', 'upload', this.controller.upload);

        return this.router;
            
    }

}



const router:express.Router = (new RefeicaoRouter(new RefeicaoController(),'refeicao')).init();

export {router as refeicaoRouter};