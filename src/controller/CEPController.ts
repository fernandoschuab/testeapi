import {NextFunction, Request, Response} from "express";
import { BaseController } from "./BaseController";
import { Repository, getRepository } from "typeorm";
import { cep } from "../entity/cep";


export class CEPController extends BaseController<cep> {
    private _repository2: Repository<cep>;
    
    
    constructor(){
        super(cep);  
        this._repository2 = getRepository<cep>(cep);       
    };
    async AdicionarCEP(request: Request){
        let{ cep, cidade, bairro, uf } = request.body;
        
        super.isRequired(cep,'Informe o cep');
        super.isRequired(cidade,'Informe a cidade');
        super.isRequired(bairro,'Informe o bairro');
        super.isRequired(uf,'Informe o estado (abreviado, 2 letras)');


        let _cep = new cep();
        _cep.cep = cep;
        _cep.cidade = cidade
        _cep.bairro = bairro;
        _cep.uf = uf;
    
        return(super.save(_cep,request));
    }

            

}