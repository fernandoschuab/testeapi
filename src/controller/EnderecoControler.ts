import {NextFunction, Request, Response} from "express";
import { BaseController } from "./BaseController";
import { enderecoCadastro } from "../entity/enderecoCadastro";
import { cadastrosUsuarios } from "../entity/cadastrosUsuarios";
import { Repository, getRepository } from "typeorm";


export class CadastroController extends BaseController<enderecoCadastro> {
    private _repository2: Repository<enderecoCadastro>;
    //private _repository: Repository<enderecoCadastro>;
    
    constructor(){
        super(enderecoCadastro);  
        this._repository2 = getRepository<enderecoCadastro>(enderecoCadastro);       
    };
    async AdicionarEndereco(request: Request){
        let{ codCadastro, logradouro,complementoEndereco, numEndereco, bairroEndereco, cep} = request.body;
        
        super.isRequired(cep,'Informe o cep');
        super.isRequired(logradouro,'Informe o logradouro');
        super.isRequired(bairroEndereco,'Informe o bairro');


        let _endereco = new enderecoCadastro();
        _endereco.cep = cep;
        _endereco.codCadastro = codCadastro
        _endereco.logradouro = logradouro;
        _endereco.numEndereco = numEndereco;
        _endereco.complementoEndereco = complementoEndereco;
        _endereco.bairroEndereco = bairroEndereco;

        return(super.save(_endereco,request));
    }

    async todosMeus(request: Request) {
      try{
        if (this.checkNotPermission(request)) return this.errorRoot;
        return this._repository2.find({
          where: {
            deleted: false,
            codCadastro: request.params.id,
          }
        });

      }catch{
        return { status: 404, errors: ['Nenhum endereço cadastrado'] }
      }
    }        

}