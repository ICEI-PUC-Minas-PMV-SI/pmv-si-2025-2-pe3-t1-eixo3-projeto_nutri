import express from "express";
import { Router } from "./router";
import { AlimentoController } from "../controller/alimento";


export class AlimentoRouter extends Router<AlimentoController> {

    init():express.Router{
        this.router = super.init();

        this.get('/', 'list', this.controller.list);

        this.post('/upload', 'upload', this.controller.upload);

        return this.router;
            
    }

}



const router:express.Router = (new AlimentoRouter(new AlimentoController(),'alimento')).init();

export {router as alimentoRouter};