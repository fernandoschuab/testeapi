import {Request, Response} from "express";
import { BaseController } from "./BaseController";
import { categorias } from "../entity/categorias";
import { Repository, getRepository } from "typeorm";


export class CategoriaController extends BaseController<categorias> {
    constructor(){
        super(categorias);        
    };



    async save(request: Request) {

        let{ categoria,descricaoCategoria,uid} = request.body;
        let _categoria = new categorias();
        _categoria.uid = uid;  


        const validar = await getRepository(categorias).findOne({uid: uid ,categoria: categoria });
        const validar3 = await getRepository(categorias).findOne({categoria: categoria, deleted:true});
        const validar2 = await getRepository(categorias).findOne({ categoria: categoria });

        if(validar){
            //se já estiver cadastrado (tiver uid), passa
        }else if (validar3){
            _categoria.deleted = false
            _categoria.uid = validar3.uid;
        }else if(validar2){
                //mas se for novo item, valida
                categoria = null;
                super.isRequired(categoria,'Inválido: Item já está cadastrado.');
        }else{
            //valida se o item é obrigatorio
            super.isRequired(categoria,"Selecione a Categoria");
        } 
        
        _categoria.categoria = categoria;
        _categoria.descricaoCategoria = descricaoCategoria;

        return super.save(_categoria, request);
    
    };
}