import admin from 'firebase-admin';
import {UsuarioCadastrado} from "../model/usuario";
import { Controller } from "./controller";
import {UsuarioDB} from "../service/usuario";
import { JsonData } from '../util/interfaces';



export class UsuarioController extends Controller{

    db:UsuarioDB;

    constructor(){
        super();
        this.db = new UsuarioDB();
    }

    async currentUser(req: any, res: any, next: any): Promise<any> {
        if(!this.usuario || !(this.usuario instanceof UsuarioCadastrado)){
            res.send({usuario:null});
            return;
        }
        res.send({usuario:{
            id: this.usuario.id,
            nome: this.usuario.nome,
            sobrenome: this.usuario.sobrenome,
            descricao: this.usuario.descricao,
            imagem: this.usuario.imagem
        }});
    }

    
    async get(req: any, res: any, next: any): Promise<any> {
        let data = this.validate(()=>{},req.params);
        if(!data){
            res.send({error:"Parâmetros inválidos."});
            return;
        }
        let usuario:UsuarioCadastrado = await this.db.find(data.id);
        let sendData:JsonData = usuario.json();
        delete sendData.firebase_uid;
        delete sendData.roles;
        if(!data.full /*&& check permission*/){
            delete sendData.email;
        }
        res.send(sendData);
        
    }

    async list(req: any, res: any, next: any): Promise<any> {
        
        res.send({success:true});

    }

    async login(req: any, res: any, next: any): Promise<any> {
        if(!req.user || req.user.tipo!='logado'){
            res.send({error:'Erro no login'});
            return;
        }
        res.send({suceess:true});

    }

    async logout(req: any, res: any, next: any): Promise<any> {
        if(req.user.tipo==='logado'){
            await admin.auth().revokeRefreshTokens(req.user.uid);
            req.user = {tipo:'convidado'};
            res.send({success:true, msg:'logout'});
            return;
        }
        res.send({success:false, error:'usuário não está logado.'});

    }

    async check(req: any, res: any, next: any): Promise<any> {
        if(req.params.field==='email' || req.params.field==='username'){
            if(await this.db.checkUserData(req.params.field,req.params.value)){
                res.send({exists:true});
                return true;
            }
            res.send({ exists: false });
            return false;
        }
        res.send({ error: 'Campo inválido.' });
        return false;
    }

    async updateCredenciais(req: any, res: any, next: any): Promise<any> {
        //implementar
    }

    async updateDados(req: any, res: any, next: any): Promise<any> {
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
            res.send({ error: 'Uusuário não está logado.' })
            return;
        }

        if (this.usuario.id != id) {
            res.send({ error: 'Ação não permitida. Apenas o usuário pode alterar a sua conta.' });
            return;
        }

        let userData:JsonData = {
            dados:data.dados
        }

        try {
            let rs = await this.db.update(id, userData);

            if (!rs) {
                res.send({ error: 'Erro ao atualizar o usuário.' });
                return;
            }

            res.send(rs);

        } catch (error) {
            console.log(error);
            res.send({ erro: error });
            return;
        }
    }

    async update(req: any, res: any, next: any): Promise<any> {
        const id:string = req.params.id;
        let data:JsonData = req.body;

        if (!id) {
            res.send({ error: 'ID não informado.' });
            return;
        }

        if (!data) {
            res.send({ error: 'Dados inválidos.' });
            return;
        }

        if(!(this.usuario instanceof UsuarioCadastrado)){
            res.send({error:'Uusuário não está logado.'})
            return;
        }

        if(this.usuario.id!=id){
            res.send({error:'Ação não permitida. Apenas o usuário pode alterar a sua conta.'});
            return;
        }


        let userData:JsonData = {
            nome: data.nome,
            sobrenome: data.sobrenome || null,
            descricao: data.descricao || null,
            username: data.username,
            dados: data.dados || null
        };

        if(data.crn && !(this.usuario as UsuarioCadastrado).crn){
            userData.crn = data.crn;
            userData.roles = this.usuario.roles;
            userData.roles.push('nutri');
        }

        if (req.file) {
            userData.imagem = this.generateImageFileName(req.file);
        }

        try {
            let rs = await this.db.update(id, userData, req.file || null);

            if (!rs) {
                res.send({ error: 'Erro ao atualizar o usuário.' });
                return;
            }

            res.send({success:true});

        } catch (error) {
            console.log(error);
            res.send({ erro: error });
            return;
        }

    }

    async create(req: any, res: any, next: any): Promise<any> {
        const app:admin.app.App = admin.app();

        const fbData = {
            email:req.body.email, 
            senha: req.body.password
        }

        let userData = {
            email:req.body.email, 
            nome: req.body.nome,
            sobrenome: req.body.sobrenome || null,
            descricao: req.body.descricao || null,
            username: req.body.username,
            dados: req.body.dados || null,
            firebase_uid: null,
            crn: req.body.crn || null,
            roles: ['usuario'],
            imagem:null
        };

        

        if(userData.crn){
            userData.roles.push('nutri')
        }

        if(req.file){
            userData.imagem = this.generateImageFileName(req.file);
        }

        if(await this.db.checkUser(userData)){
            res.send({error:'Usuário já existe'});
            return;
        }

        try{

            const userRecord = await admin.auth().createUser({
                email:fbData.email,
                password:fbData.senha
            });

            userData.firebase_uid = userRecord.uid;

            let rs = await this.db.create(userData, req.file || null);

            if(!rs){
                res.send({error:"Erro no registro do usuário"});
                //rollback firebase
                return;
            }
            res.send({success:true,id:rs.id});

        } catch(error){
            console.log(error);
            res.send(error);
            return;
        }

        //res.send(req.params);

    }


}