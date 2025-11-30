import express from "express";
import { Router } from "./router";
import { RefeicaoController } from "../controller/refeicao";


export class RefeicaoRouter extends Router<RefeicaoController> {

    init():express.Router{
        this.router = super.init();

        
        
        this.get('/usuario/:id/:dia_inicial/:dia_final', 'list_usuario', this.controller.listUsuario);
        
        this.get('/', 'list', this.controller.list);

        this.get('/:id', 'get', this.controller.get);

        this.post('/imagem/:id', 'upload', this.controller.updateImagem);

        this.post('/', 'create', this.controller.create);

        this.put('/:id', 'update', this.controller.update);

        this.delete('/:id', 'delete', this.controller.delete);

        /*this.get('/agua/:id/:dia', 'get', this.controller.getAgua);
        
        this.post('/agua', 'create', this.controller.createAgua);

        this.put('/agua/:id', 'update', this.controller.updateAgua);

        this.delete('/agua/:id', 'delete', this.controller.deleteAgua);*/

        return this.router;
            
    }

}



const router:express.Router = (new RefeicaoRouter(new RefeicaoController(),'refeicao')).init();

export {router as refeicaoRouter};