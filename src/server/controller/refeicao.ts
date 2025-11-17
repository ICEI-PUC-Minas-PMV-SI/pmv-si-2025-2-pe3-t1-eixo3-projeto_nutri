import { Refeicao } from "../model/refeicao";
import { RefeicaoDB } from "../service/refeicao";
import { Controller } from "./controller";


export class RefeicaoController extends Controller {

    db:RefeicaoDB;

    constructor(){
        super();
        this.db = new RefeicaoDB();
    }


    async list(req, res, next): Promise<any> {

        let refeicaos:Array<Refeicao> = await this.db.list();

        res.send(refeicaos);

    }
    
}