import { BaseController } from "./BaseController";
import {NextFunction, Request, Response} from "express";
import { itensKit } from "../entity/itensKit";
import { listaDesejos } from "../entity/listaDesejos";
import { getRepository } from "typeorm";

export class ListaDesejosController extends BaseController<listaDesejos> {
    constructor(){
        super(listaDesejos);        
    };

    async AdicionarItemaoKit (request: Request){
      let{uid, codCadastro, codItem} = request.body;
      let _listaDesejos = new listaDesejos();

      const validar = await getRepository(listaDesejos).findOne({uid: uid ,codCadastro: codCadastro,codItem: codItem });
      const validar3 = await getRepository(listaDesejos).findOne({codCadastro: codCadastro,codItem: codItem, deleted:true});
      const validar2 = await getRepository(listaDesejos).findOne({ codCadastro: codCadastro,codItem: codItem, });

      if(validar){
          //se já estiver cadastrado (tiver uid), passa
      }else if (validar3){
          _listaDesejos.deleted = false
          _listaDesejos.uid = validar3.uid;
      }else if(validar2){
              //mas se for novo item, valida
              codItem = null;
              super.isRequired(codItem,'Inválido: Item já está cadastrado.');
      }else{
        super.isRequired(codItem,'Selecione o item a adicionar');
        super.isRequired(codCadastro,'Erro, cadastro não encontrado, favor faxer login novamente');
      } 
      


      super.isRequired(codItem,'Selecione o item a adicionar');


      _listaDesejos.codCadastro = codCadastro;
      _listaDesejos.codItem = codItem;

      return(super.save(_listaDesejos,request));
  }


}