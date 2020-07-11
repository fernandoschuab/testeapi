import { BaseController } from "./BaseController";
import {NextFunction, Request, Response} from "express";
import { itens } from "../entity/itens";
import {tipoproduto} from '../entity/enum/tipoproduto'
import { getRepository, Repository, Not } from "typeorm";
import { FileHelper } from "../helpers/fileHelpers";

export class itensController extends BaseController<itens> {
    private _repository2: Repository<itens>;
    constructor(){
        super(itens); 
        this._repository2 = getRepository<itens>(itens);       
    };
    async AdicionarItem (request: Request){
        
    }

    async kits(request: Request) {
        return this._repository2.find({
          where: {
            tipoProduto: 2
          }
        });
      }

      async porCategoria(request: Request) {
        return this._repository2.find({
          where: {
            codCategoria: request.params.id
          }
        });
      }

      async nokits(request: Request) {
        return this._repository2.find({

          where: {
            tipoProduto: Not(2)
          }
        });
      }

    async save(request: Request) {
        let{uid,nomeItem, codCategoria,codQuant, tipoProduto,foto, descricaoItem, preco} = request.body;
        let _item = new itens();
        _item.uid = uid;

        const validar = await getRepository(itens).findOne({uid: uid ,nomeItem: nomeItem });
        const validar3 = await getRepository(itens).findOne({nomeItem: nomeItem, deleted:true});
        const validar2 = await getRepository(itens).findOne({ nomeItem: nomeItem });
        

        if(validar){
            //se já estiver cadastrado (tiver uid), passa
        }else if (validar3){
            _item.deleted = false
            _item.uid = validar3.uid;
        }else if(validar2){
                //mas se for novo item, valida se mesmo nome
                nomeItem = null;
                super.isRequired(nomeItem,'Inválido: Item já está cadastrado.');
        }else{
            super.isRequired(nomeItem,"Selecione o nome do Item");
            if(preco<=0){
              preco = null;
              super.isRequired(preco,"Informe um preço válido");
            }
        } 

        super.isRequired(codCategoria,'Selecione a categoria');
        super.isRequired(tipoProduto,'Informe o tipo de produto');
        super.isRequired(codQuant,'Informe o tipo de quantidade a ser usada para o produto');


        _item.nomeItem = nomeItem;
        _item.codCategoria = codCategoria
        _item.codQuant = codQuant;
        _item.tipoProduto = <tipoproduto>tipoProduto;
        _item.descricaoItem = descricaoItem;
        _item.foto = foto;
        _item.preco = preco;

        if(_item.foto){
          let pictureCreatedResult = await FileHelper.writePicture(_item.foto)
          if(pictureCreatedResult)
            _item.foto =pictureCreatedResult;
        }
        return(super.save(_item,request));
    };




  async estoque(request: Request) {
    let{uid,qtdeEmEstoque} = request.body;
    let _item = new itens();
    _item.uid = uid;
    _item.qtdeEmEstoque = qtdeEmEstoque;

  if(qtdeEmEstoque ==0){
    qtdeEmEstoque = null
  }
  super.isRequired(qtdeEmEstoque,'Quantidade estoque não pode ser zerada');
      

      
  return(super.save(_item,request));
  };
}