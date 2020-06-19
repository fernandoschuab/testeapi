import { Request } from 'express';
import { BaseController } from "./BaseController";
import { sign } from 'jsonwebtoken';
import config from "../configuration/config";
import * as md5 from 'md5';
import { funcionarios } from '../entity/funcionarios';
import { getRepository } from 'typeorm';
import { FileHelper } from '../helpers/fileHelpers';

export class FuncionariosController extends BaseController<funcionarios> {

    constructor() {
        super(funcionarios);
    }

    async auth(request: Request) {

        let { email, senha } = request.body;
        if (!email || !senha)
            return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

        let funcionarios = await this.repostitory.findOne({ email: email, senha: md5(senha) });
        if (funcionarios) {
            let _payload = {
                uid: funcionarios.uid,
                nome: funcionarios.nome,
                foto: funcionarios.foto,
                email: funcionarios.email
            }
            return {
                status: 200,
                message: {
                    funcionarios: _payload,
                    token: sign({
                        ..._payload, 
                        tm: new Date().getTime()
                    }, config.secretkey)
                }
            }
        } else
            return { status: 404, message: 'E-mail ou senha inválidos' }
    }

    async save(request: Request) {
        let { nome,sobrenome,cpf,  foto,cargo, email, senha, confirmaSenha, isRoot, uid } = request.body;
        let _funcionarios = new funcionarios();
        _funcionarios.uid = uid;

        const validar = await getRepository(funcionarios).findOne({uid: uid });
        const validar2 = await getRepository(funcionarios).findOne({ email: email });
        const validar3 = await getRepository(funcionarios).findOne({ cpf: cpf });

        if(validar){
            //se já estiver cadastrado (tiver uid), passa
        }else {
            if(validar2){
                //mas se for novo item, valida email
                email = null;
                super.isRequired(email,'Inválido: Email já está cadastrado.');
            }
            if(validar3){
            //mas se for novo item, valida cpf
            cpf = null;
            super.isRequired(cpf,'Inválido: CPF já está cadastrado.');
            }
            super.isRequired(senha, 'Informe a senha');
            super.isRequired(confirmaSenha, 'Informe a confirmação da senha');
            if (senha != confirmaSenha)
                return { status: 400, errors: ['A senha e a confirmação são diferente'] }
            if (senha)
            _funcionarios.senha = md5(senha);
        }
        
        super.isRequired(nome, 'Informe o nome');
        super.isRequired(sobrenome, 'Informe o sobrenome');
        super.isRequired(cargo, 'Informe o cargo do Funcionário');
        super.isRequired(foto, 'Informe a foto');
        super.isRequired(email, 'Informe o e-mail');
        super.isRequired(cpf,"Informe o cpf");
  
        _funcionarios.nome = nome;
        _funcionarios.sobrenome =sobrenome;
        _funcionarios.cargo = cargo;
        _funcionarios.email = email;
        _funcionarios.cpf = cpf;
        _funcionarios.isRoot = isRoot;
        _funcionarios.foto = foto;


        if(await this.validarCPF(cpf) == false){
            cpf = null;
            super.isRequired(cpf,'CPF invalido');
        }

        if(await this.validaEmail(email) == false){
            email = null;
            super.isRequired(email,'Email invalido');
        }
        
      
        if(_funcionarios.foto){
          let pictureCreatedResult = await FileHelper.writePicture(_funcionarios.foto)
          if(pictureCreatedResult)
            _funcionarios.foto =pictureCreatedResult;
        }

        return super.save(_funcionarios, request);
    }

    // async save(request: Request) {
    //     let _funcionarios = <funcionarios>request.body;
    //     super.isRequired(_funcionarios.nome, 'O nome do usuário é obrigatório');
    //     super.isRequired(_funcionarios.foto, 'A foto do usuário é obrigatória');
    //     return super.save(_funcionarios, request);
    // }

    
    async validarCPF(inputCPF): Promise<boolean>{
        var soma = 0;
        var resto;
    
        if(inputCPF == '00000000000') return false;
        let i: number;
        for(i=1; i<=9; i++) {
            soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
    
        if((resto == 10) || (resto == 11)) resto = 0;
        if(resto != parseInt(inputCPF.substring(9, 10))) return false;
    
        soma = 0;
        for(i = 1; i <= 10; i++) {
            soma = soma + parseInt(inputCPF.substring(i-1, i))*(12-i);
        }
        resto = (soma * 10) % 11;
    
        if((resto == 10) || (resto == 11)) resto = 0;
        if(resto != parseInt(inputCPF.substring(10, 11))) return false;
        return true;
    }


    validaEmail(value) {
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value))
          return false;
        else
            return true
      }
    
}