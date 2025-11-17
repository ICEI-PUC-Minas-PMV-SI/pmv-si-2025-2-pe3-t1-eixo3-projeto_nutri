import { Alimento } from "../model/alimento";
import { AlimentoDB } from "../service/alimento";
import { Controller } from "./controller";


export class AlimentoController extends Controller {

    db:AlimentoDB;

    constructor(){
        super();
        this.db = new AlimentoDB();
    }


    async list(req, res, next): Promise<any> {

        let alimentos:Array<Alimento> = await this.db.list();

        res.send(alimentos);

    }
    
}