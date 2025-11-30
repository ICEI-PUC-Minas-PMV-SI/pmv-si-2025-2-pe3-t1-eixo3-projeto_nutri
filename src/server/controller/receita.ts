import { Alimento } from "../model/alimento";
import { Receita } from "../model/receita";
import { UsuarioCadastrado } from "../model/usuario";
import { AlimentoDB } from "../service/alimento";
import { ReceitaDB } from "../service/receita";
import { Ingrediente, JsonData, Nutrientes } from "../util/interfaces";
import { AlimentoController } from "./alimento";
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

    async listUsuario(req, res, next): Promise<any> {
        if(!req.params.id){
            res.send({error:"Id de usuário inválido"});
            return;
        }
        let receitas: Array<Receita> = await this.db.list(req.params.id);
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


    async create(req, res, next): Promise<any> {
        let data:JsonData = req.body;

        if(!data){
            res.send({error:'Dados inválidos.'});
            return;
        }

        if (!(this.usuario instanceof UsuarioCadastrado)) {
            res.send({error:'Usuário não está logado.'});
            return;
        }

        let alimento:Alimento = await new AlimentoDB().find(data.alimento);

        let receitaData = {
            alimento: data.alimento,
            nome: data.nome,
            descricao: data.descricao || null,
            modoPreparo: data.modo_preparo || null,
            tempoPreparo: data.tempo_preparo || null,
            ingredientesEntrada: data.ingredientes_entrada || [],
            criador:this.usuario.id,
            nutrientes:alimento.nutrientes,
            imagem:null
        }

        if(req.file){
            receitaData.imagem = this.generateImageFileName(req.file);
        }

        try {
            let rs = await this.db.create(receitaData, req.file || null);
            if(!rs){
                res.send({error:'Erro na criação da receita.'});
                return;
            }
            let alimentoController:AlimentoController = new AlimentoController();
            let rsa = alimentoController.addReceita(receitaData.alimento, {receitas:rs.receitas});
            if (!rsa) {
                res.send({ error: 'Erro na adição de receita.' });
                return;
            }

            res.send({success:true});

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

        let receita:Receita = await this.db.find(id);

        if (data.alimento && data.alimento != receita.alimento) {
            let alimentoDB = new AlimentoDB();
            let alimentoController = new AlimentoController();
            let alimentoAntigo: Alimento = await alimentoDB.find(receita.alimento);
            let alimentoNovo: Alimento = await alimentoDB.find(data.alimento);
            alimentoNovo.receitas.push(id);
            alimentoController.removeReceita(alimentoAntigo,id);
            alimentoController.addReceita(alimentoNovo.id,{id:alimentoAntigo.id,receitas:alimentoNovo.receitas});
            receita.alimento = data.alimento;
            receita.nutrientes = alimentoNovo.nutrientes;
        }

        // Monta o objeto exatamente como em create()
        let receitaData = {
            nome: data.nome || receita.nome,
            descricao: data.descricao || receita.descricao,
            modoPreparo: data.modo_preparo || receita.modoPreparo,
            tempoPreparo: data.tempo_preparo || receita.tempoPreparo,
            ingredientesEntrada: data.ingredientes_entrada || receita.ingredientesEntrada,
            nutrientes: data.nutrientes || receita.nutrientes,
            imagem: receita.imagem
        }

        // Se uma nova imagem foi enviada, gera novo nome
        if (req.file) {
            receitaData.imagem = this.generateImageFileName(req.file);
        }


        try {
            let rs = await this.db.update(id, receitaData, req.file || null);

            if (!rs) {
                res.send({ error: 'Erro ao atualizar a receita.' });
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