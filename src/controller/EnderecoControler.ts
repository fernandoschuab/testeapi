import {NextFunction, Request, Response} from "express";
import { BaseController } from "./BaseController";
import { categorias } from "../entity/categorias";
import { enderecoCadastro } from "../entity/enderecoCadastro";
import { cadastrosUsuarios } from "../entity/cadastrosUsuarios";


export class CadastroController extends BaseController<categorias> {
    constructor(){
        super(categorias);        
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

}