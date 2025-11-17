import { Receita } from "../model/receita";
import { ReceitaDB } from "../service/receita";
import { Controller } from "./controller";


export class ReceitaController extends Controller {

    db:ReceitaDB;

    constructor(){
        super();
        this.db = new ReceitaDB();
    }


    async list(req, res, next): Promise<any> {
        let receitas:Array<Receita> = await this.db.list();
        res.send(receitas);
    }

    async get(req, res, next): Promise<any> {
        if(req.params.id){
            let receita:Receita = await this.db.find(req.params.id);
            if(!receita){
                res.send({});
                return;
            }
            res.send(receita.json());
            return;
        }
        res.send({error:"Id inválido."});
        
    }
    
}