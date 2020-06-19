import {Request, Response} from 'express';
import {verify} from 'jsonwebtoken';
//import { ClientResponse, STATUS_CODES } from 'http';
import config from '../configuration/config';
import { getRepository, Repository } from 'typeorm';
import { funcionarios } from '../entity/funcionarios';

//rote -> controller -> repository
//rote -> middlawre -> controller -> repository

export default async(req: Request, res: Response, next: Function) => {
    let token = req.body.token || req.query.token || req.headers['x-token-access'];
    let publicRoutes = <Array<String>>config.publicRoutes; // <Array<String>> conversao por causa do erro forEach
    let isPublicRoute: boolean = false;
    let _funcionariosRepository:Repository<funcionarios> = getRepository(funcionarios);



    publicRoutes.forEach(url => {
        let isPublic = req.url.includes(url) || req.url.indexOf('storage')> -1;
        if(isPublic)
            isPublicRoute = true;
        
    });
    if(isPublicRoute)
        next()  //se for rota publica, deixa passar
    else{

        if(token){ //se existe
            try {
        
                let _funcionariosAuth = verify(token, config.secretkey);
                req.funcionariosAuth = _funcionariosAuth;
        
                let _funcionariosDB = await _funcionariosRepository.findOne({ where: { uid: _funcionariosAuth.uid } });
                //req.IsRoot = _funcionariosDB.isRoot;
        
                next();
              } catch (error) {
                res.status(401).send({ message: 'Token informado é inválido' });
                return;
              }
            } else { //se nao enviado token, recusa acesso
              res.status(401).send({ message: 'Para acessar esse recurso você precisa estar autenticado' });
              return;
            }
    }
}