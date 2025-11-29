import express from "express";
import { Router } from "./router";
import { AlimentoController } from "../controller/alimento";
import upload from '../middleware/upload';

export class AlimentoRouter extends Router<AlimentoController> {

    init():express.Router{
        this.router = super.init();

        this.get('/', 'list', this.controller.list);

        this.get('/search/:term', 'get', this.controller.search);

        this.get('/:id', 'get', this.controller.get);

        this.post('/', 'create', [upload.single('imagem')], this.controller.create);

        this.put('/:id', 'update', [upload.single('imagem')], this.controller.updateSimples);

        this.post('/imagem/:id', 'upload', this.controller.updateImagem);

        return this.router;
            
    }

}



const router:express.Router = (new AlimentoRouter(new AlimentoController(),'alimento')).init();

export {router as alimentoRouter};