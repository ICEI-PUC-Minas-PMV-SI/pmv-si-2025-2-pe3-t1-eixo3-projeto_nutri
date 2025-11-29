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

        let refeicoes:Array<Refeicao> = await this.db.list();

        res.send(refeicoes);

    }

    async listUsuario(req, res, next): Promise<any> {

        let refeicaos: Array<Refeicao> = await this.db.list();

        res.send(refeicaos);

    }

    async get(req, res, next): Promise<any> {

    }


    async create(req, res, next): Promise<any> {

    }


    async update(req, res, next): Promise<any> {

    }


    async delete(req, res, next): Promise<any> {

    }
    

    async getAgua(req, res, next): Promise<any> {

    }


    async createAgua(req, res, next): Promise<any> {

    }


    async updateAgua(req, res, next): Promise<any> {

    }


    async deleteAgua(req, res, next): Promise<any> {

    }
}