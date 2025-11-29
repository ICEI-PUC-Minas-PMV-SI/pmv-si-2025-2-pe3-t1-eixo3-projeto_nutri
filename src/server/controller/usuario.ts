import admin from 'firebase-admin';
//import serviceAccount from "../config/fb.json";
import {Usuario, UsuarioCadastrado} from "../model/usuario";
import { Controller } from "./controller";
import {UsuarioDB} from "../service/usuario";
import { JsonData } from '../util/interfaces';



export class UsuarioController extends Controller{

    db:UsuarioDB;

    constructor(){
        super();
        this.db = new UsuarioDB();
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
            res.send({success:false,error:'Erro no login'});
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

    async update(req: any, res: any, next: any): Promise<any> {

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

        } catch(error){
            console.log(error);
            res.send(error);
            return;
        }

        //res.send(req.params);

    }


}