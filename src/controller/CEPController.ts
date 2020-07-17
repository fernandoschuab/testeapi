import {NextFunction, Request, Response} from "express";
import { BaseController } from "./BaseController";
import { Repository, getRepository } from "typeorm";
import { CEP } from "../entity/cep";


export class CEPController extends BaseController<CEP> {

    
    constructor(){
        super(CEP);    
    };

    async AdicionarCEP(request: Request){
        let{ cep, cidade, bairro, uf } = request.body;
        
        super.isRequired(cep,'Informe o cep');
        super.isRequired(cidade,'Informe a cidade');
        super.isRequired(bairro,'Informe o bairro');
        super.isRequired(uf,'Informe o estado (abreviado, 2 letras)');


        let _cep = new CEP();
        _cep.cep = cep;
        _cep.cidade = cidade
        _cep.bairro = bairro;
        _cep.uf = uf;
    
        return(super.save(_cep,request));
    };

            

}