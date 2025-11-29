import { Alimento } from "../model/alimento";
import { UsuarioCadastrado } from "../model/usuario";
import { AlimentoDB } from "../service/alimento";
import { JsonData } from "../util/interfaces";
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

    async search(req, res, next): Promise<any> {

        let alimentos: Array<JsonData> = await this.db.search(req.params.term);

        res.send(alimentos);

    }


    async get(req, res, next): Promise<any> {

        let alimento:Alimento = await this.db.find(req.params.id);

        if(alimento){
            res.send(alimento.json());
            return;
            
        }

        res.send({error:'Alimento não encontrado.'});

    }


    async create(req, res, next): Promise<any> {
        let data:JsonData = req.body;

        if(!data){
            res.send({error:'Dados inválidos.'});
            return;
        }

        let alimentoData = {
            nome: data.nome,
            descricao: data.descricao || null,
            categoria: data.categoria || null,
            subcategoria: data.subcategoria || null,
            nutrientes: data.nutrientes || null,
            estado: data.estado || null,
            modificadores: data.modificadores || [],
            //tags: data.tags || [],
            criador:null,
            imagem:null
        }

        if(req.file){
            alimentoData.imagem = this.generateImageFileName(req.file);
        }

        if(this.usuario instanceof UsuarioCadastrado){
            alimentoData.criador = this.usuario.id;
        }

        try {
            let rs = await this.db.create(alimentoData, req.file || null);
            if(!rs){
                res.send({error:'Erro na criação do alimento.'});
                return;
            }

            res.send(rs);

        } catch(error) {
            console.log(error);
            res.send({erro:error});
            return;
        }

    }

    async update(req, res, next): Promise<any> {
        const id: string = req.params.id;      // ID vindo da rota
        let data: JsonData = req.body;

        if (!id) {
            res.send({ error: 'ID não informado.' });
            return;
        }

        if (!data) {
            res.send({ error: 'Dados inválidos.' });
            return;
        }

        // Monta o objeto exatamente como em create()
        let alimentoData:JsonData = {
            nome: data.nome,
            descricao: data.descricao || null,
            categoria: data.categoria || null,
            subcategoria: data.subcategoria || null,
            nutrientes: data.nutrientes || null,
            estado: data.estado || null,
            modificadores: data.modificadores || []
        };

        // Se uma nova imagem foi enviada, gera novo nome
        if (req.file) {
            alimentoData.imagem = this.generateImageFileName(req.file);
        }


        try {
            let rs = await this.db.update(id, alimentoData, req.file || null);

            if (!rs) {
                res.send({ error: 'Erro ao atualizar o alimento.' });
                return;
            }

            res.send(rs);

        } catch (error) {
            console.log(error);
            res.send({ erro: error });
            return;
        }
    }


    async updateImagem(req, res, next): Promise<any> {
        const id: string = req.params.id;      // ID vindo da rota
        
        if (!id) {
            res.send({ error: 'ID não informado.' });
            return;
        }


        if (!req.file) {
            res.send({ error: 'Imagem não enviada' });
            return;
        }

        let data:JsonData = {
            imagem: this.generateImageFileName(req.file)
        }

        try {
            let rs = await this.db.update(id, data, req.file || null);

            if (!rs) {
                res.send({ error: 'Erro ao atualizar a imagem.' });
                return;
            }

            res.send(rs);

        } catch (error) {
            console.log(error);
            res.send({ erro: error });
            return;
        }

    }

    
}