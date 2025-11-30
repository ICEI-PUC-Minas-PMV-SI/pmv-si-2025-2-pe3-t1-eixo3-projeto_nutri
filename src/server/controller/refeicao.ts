import { Alimento } from "../model/alimento";
import { Refeicao } from "../model/refeicao";
import { UsuarioCadastrado } from "../model/usuario";
import { AlimentoDB } from "../service/alimento";
import { RefeicaoDB } from "../service/refeicao";
import { JsonData, Medida, conversaoMedida } from "../util/interfaces";
import { Controller } from "./controller";


export class RefeicaoController extends Controller {

    db:RefeicaoDB;

    constructor(){
        super();
        this.db = new RefeicaoDB();
    }


    async list(req, res, next): Promise<any> {

        let refeicoes:Array<JsonData> = await this.db.list();

        res.send(refeicoes);

    }

    async listUsuario(req, res, next): Promise<any> {
        const id: string = req.params.id;
        const diaInicial:string = req.params.dia_inicial;
        const diaFinal:string = req.params.dia_final;

        if (!id) {
            res.send({ error: 'ID não informado.' });
            return;
        }

        let params:JsonData = {
            id:id,  
            diaInicial:diaInicial || null,
            diaFinal:diaFinal || null
        }

        let refeicoes: Array<JsonData> = await this.db.list(params);

        res.send(refeicoes);

    }

    async get(req, res, next): Promise<any> {

    }


    async create(req, res, next): Promise<any> {
        let data:JsonData = req.body;
        
        if(!data){
            res.send({error:'Dados inválidos.'});
            return;
        }

        if (!(this.usuario instanceof UsuarioCadastrado)) {
            res.send({error:'Usuário não está logado.'});
        }

        let refeicaoData:JsonData = {
            nome: data.nome || null,
            descricao: data.descricao || null,
            criador: this.usuario.id,
            tipo: data.tipo,
            dataHora: data.data_hora ? new Date(data.data_hora) : new Date(),
            ingredientes: data.ingredientes || [],
            imagem: data.imagem || null,
        }

        let nutrientes:JsonData = {
            energia: 0, //kcal
            proteina: 0, //g
            carboidrato: 0, //g
            fibras: 0, //g
            colesterol: 0, //mg
            acucares: 0, //g
            indiceGlicemico: 0, //escala
            gordurasTotais: 0,
            gordurasSaturadas: 0
        }

        let alimentoDB = new AlimentoDB();

        for(let i of refeicaoData.ingredientes){
            let alimento:Alimento = await alimentoDB.find(i.alimento_id);
            const quantidadeEmGramas = conversaoMedida(
                i.quantidade,
                i.medida,
                Medida.g // base padrão do alimento
            );

            const multiplicador = quantidadeEmGramas / 100;
            const n = alimento.nutrientes;
            nutrientes.energia += (n.energia || 0) * multiplicador;
            nutrientes.proteina += (n.proteina || 0) * multiplicador;
            nutrientes.carboidrato += (n.carboidrato || 0) * multiplicador;
            nutrientes.fibras += (n.fibras || 0) * multiplicador;
            nutrientes.colesterol += (n.colesterol || 0) * multiplicador;
            nutrientes.acucares += (n.acucares || 0) * multiplicador;
            nutrientes.indiceGlicemico += (n.indiceGlicemico || 0) * multiplicador;
            nutrientes.gordurasTotais += (n.gordurasTotais || 0) * multiplicador;
            nutrientes.gordurasSaturadas += (n.gordurasSaturadas || 0) * multiplicador;
        }

        refeicaoData.nutrientes = nutrientes;

        if(req.file){
            refeicaoData.imagem = this.generateImageFileName(req.file);
        }
        
        try {
            let rs = await this.db.create(refeicaoData, req.file || null);
            if(!rs){
                res.send({error:'Erro na criação da refeição.'});
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
        const id: string = req.params.id;
        let data: JsonData = req.body;

        if (!id) {
            res.send({ error: 'ID não informado.' });
            return;
        }

        if (!data) {
            res.send({ error: 'Dados inválidos.' });
            return;
        }

        if (!(this.usuario instanceof UsuarioCadastrado)) {
            res.send({ error: 'Usuário não está logado.' });
            return;
        }

        // Busca a refeição atual para preencher defaults
        let refeicaoAtual = await this.db.find(id);
        if (!refeicaoAtual) {
            res.send({ error: 'Refeição não encontrada.' });
            return;
        }

        // Monta objeto base, reaproveitando os valores antigos quando o campo não vier no body
        const ingredientesAtualizados = data.ingredientes || refeicaoAtual.ingredientes || [];

        let refeicaoData: JsonData = {
            nome: data.nome ?? refeicaoAtual.nome ?? null,
            descricao: data.descricao ?? refeicaoAtual.descricao ?? null,
            // normalmente não se muda criador numa edição
            criador: refeicaoAtual.criador || this.usuario.id,
            tipo: data.tipo ?? refeicaoAtual.tipo,
            dataHora: data.data_hora
                ? new Date(data.data_hora)
                : (refeicaoAtual.dataHora || new Date()),
            ingredientes: ingredientesAtualizados,
            imagem: refeicaoAtual.imagem || null
        };

        // Se veio uma nova imagem, sobrescreve
        if (req.file) {
            refeicaoData.imagem = this.generateImageFileName(req.file);
        } else if (data.imagem === null) {
            // se quiser permitir "remover" a imagem
            refeicaoData.imagem = null;
        }

        // Recalcula nutrientes com base nos ingredientes
        let nutrientes: JsonData = {
            energia: 0,           // kcal
            proteina: 0,          // g
            carboidrato: 0,       // g
            fibras: 0,            // g
            colesterol: 0,        // mg
            acucares: 0,          // g
            indiceGlicemico: 0,   // escala
            gordurasTotais: 0,
            gordurasSaturadas: 0
        };

        const alimentoDB = new AlimentoDB();

        for (let ing of ingredientesAtualizados) {
            let alimento: Alimento = await alimentoDB.find(ing.alimento_id);
            if (!alimento || !alimento.nutrientes) continue;

            const quantidadeEmGramas = conversaoMedida(
                ing.quantidade,
                ing.medida,
                Medida.g // base padrão do alimento (assumindo nutrientes por 100g)
            );

            const multiplicador = quantidadeEmGramas / 100;
            const n = alimento.nutrientes;

            nutrientes.energia += (n.energia || 0) * multiplicador;
            nutrientes.proteina += (n.proteina || 0) * multiplicador;
            nutrientes.carboidrato += (n.carboidrato || 0) * multiplicador;
            nutrientes.fibras += (n.fibras || 0) * multiplicador;
            nutrientes.colesterol += (n.colesterol || 0) * multiplicador;
            nutrientes.acucares += (n.acucares || 0) * multiplicador;
            nutrientes.indiceGlicemico += (n.indiceGlicemico || 0) * multiplicador;
            nutrientes.gordurasTotais += (n.gordurasTotais || 0) * multiplicador;
            nutrientes.gordurasSaturadas += (n.gordurasSaturadas || 0) * multiplicador;
        }

        refeicaoData.nutrientes = nutrientes;

        try {
            const rs = await this.db.update(id, refeicaoData, req.file || null);

            if (!rs) {
                res.send({ error: 'Erro ao atualizar a refeição.' });
                return;
            }

            res.send(rs);
        } catch (error) {
            console.log(error);
            res.send({ erro: error });
            return;
        }
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