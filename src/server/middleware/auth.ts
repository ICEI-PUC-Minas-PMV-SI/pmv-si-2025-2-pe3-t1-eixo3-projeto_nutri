import admin from 'firebase-admin';
import {config} from "../config/fb";

export class Auth {


    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(config as admin.ServiceAccount)
        });
    }

    async checkAuth(req,res,next):Promise<any>{
        const header = req.headers.authorization;
        let user = null;

        console.log(req.headers.authorization);

        if (header?.startsWith("Bearer ")) {
            const token = header.split(" ")[1];

            //console.log('token: '+token);

            try {
                const decoded = await admin.auth().verifyIdToken(token);

                user = {
                    tipo: "logado",
                    uid: decoded.uid
                };
            } catch (err) {
                console.warn("Token inválido, tratando como convidado.");
            }
        }

        if (!user) {
            user = {
                tipo: "convidado"
            };
        }

        req.user = user;

        next();
    }



}

const auth = new Auth();

export {auth};