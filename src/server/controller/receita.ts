import { Receita } from "../model/receita";
import { UsuarioCadastrado } from "../model/usuario";
import { ReceitaDB } from "../service/receita";
import { Ingrediente, JsonData, Nutrientes } from "../util/interfaces";
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

    calularNutrientes(listaIngredientes:Array<Ingrediente>):Nutrientes{
        let nutrientes:Nutrientes = {
            energia: 0,
            proteina: 0,
            carboidrato: 0, //g
            fibras: 0, //g
            colesterol: 0,
            acucares: 0, //g
            indiceGlicemico: 0, //escala
            gordurasTotais: 0,
            gordurasSaturadas: 0
        };
        for(let i of listaIngredientes){

        }


        return null;
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
    
            let receitaData = {
                alimento: data.alimento || null,
                nome: data.nome,
                descricao: data.descricao || null,
                modoPreparo: data.modo_preparo || null,
                tempoPreparo: data.tempo_preparo || null,
                ingredientesEntrada: data.ingredientes_entrada || [],
                ingredientesFinais: data.ingredientes_finais || [],
                criador:this.usuario.id,
                imagem:null
            }
    
            if(req.file){
                receitaData.imagem = this.generateImageFileName(req.file);
            }
    
            
    
            try {
                let rs = await this.db.create(receitaData, req.file || null);
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
    
}