import {getRepository, Repository, Connection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { cadastrosUsuarios } from "../entity/cadastrosUsuarios";
import { BaseController } from "./BaseController";
import {sign} from 'jsonwebtoken';
import config from '../configuration/config'
import * as md5 from 'md5';
import { genero } from "../entity/enum/genero";
import { FileHelper } from "../helpers/fileHelpers";


export class CadastroController extends BaseController<cadastrosUsuarios> {
    private _repository2: Repository<cadastrosUsuarios>;
    constructor(){
        super(cadastrosUsuarios);
        
    }
    async auth(request: Request){
        let {email, senha} = request.body;
        if(!email || !senha)
            return {status:400, message: 'Informe o email e a senha para efetuar o login'};
        let cadastrosUsuarios = await this.repostitory.findOne({email:email, senha: md5(senha)});
        if(cadastrosUsuarios){
            let _payload = {
               uid: cadastrosUsuarios.uid,
                email: cadastrosUsuarios.email
            }
            return {
                status: 200,
                message:{
                    user: _payload,
                    token: sign({
                        ... _payload,
                        tm: new Date().getTime()
                    }, config.secretkey)
                }
                
            }

        }else{
            return{status: 404, message: 'E-mail ou senha invalidos'};
        }
        
    };
        
    

    async save(request: Request){
        let{ nomePessoa,sobrenomePessoa,dataNasc,cpf,generoPessoa,foto, telefone, email, senha, confirmaSenha, uid} = request.body;
        console.log(request.params.id);
       let _clientes = new cadastrosUsuarios();
        _clientes.uid = uid;
        console.log(uid);
    
            const validar = await getRepository(cadastrosUsuarios).findOne({uid: uid });
            const validar2 = await getRepository(cadastrosUsuarios).findOne({ email: email });
            const validar3 = await getRepository(cadastrosUsuarios).findOne({ cpf: cpf });
    
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
                _clientes.senha = md5(senha);
            }

            super.isRequired(nomePessoa, 'Informe o nome');
            super.isRequired(sobrenomePessoa, 'Informe o sobrenome');
            super.isRequired(foto, 'Informe a foto');

            _clientes.nomePessoa = nomePessoa;
            _clientes.sobrenomePessoa =sobrenomePessoa;
            _clientes.email = email;
            _clientes.cpf = cpf;
            _clientes.foto = foto;
            _clientes.dataNasc = dataNasc;
            _clientes.generoPessoa = generoPessoa;
            _clientes.telefone =telefone;
        
    
            if(await this.validarCPF(cpf) == false){
                cpf = null;
                super.isRequired(cpf,'CPF invalido');
            }
    
            if(await this.validaEmail(email) == false){
                email = null;
                super.isRequired(email,'Email invalido');
            }
            
          
            if(_clientes.foto){
              let pictureCreatedResult = await FileHelper.writePicture(_clientes.foto)
              if(pictureCreatedResult)
                _clientes.foto =pictureCreatedResult;
            }
    
            return super.save(_clientes, request);
        }
    
        
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
        
          async one2(request: Request) {
            if (this.checkNotPermission(request)) return this.errorRoot;

            let rep = this._repository2.findOne(request.params.id);
            (await rep).senha = "";
            return rep;
          }
    }













