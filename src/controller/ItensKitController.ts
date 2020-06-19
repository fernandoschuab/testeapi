import { BaseController } from "./BaseController";
import {NextFunction, Request, Response} from "express";
import { itensKit } from "../entity/itensKit";
import { getRepository, Repository } from "typeorm";

export class ItensKitController extends BaseController<itensKit> {
  private _repository2: Repository<itensKit>;
    constructor(){
        super(itensKit); 
        this._repository2 = getRepository<itensKit>(itensKit);    
 
    };
    async itenskits(request: Request) {
      return this._repository2.find({
        where: {
          codKit: request.params.id
        }
      });
    }
    async save (request: Request){
      let{uid, codKit, codItem, qtdeItem} = request.body;

      super.isRequired(codKit,'Selecione o kit');
      let _itensKit = new itensKit();
      _itensKit.uid = uid;
      const validar = await getRepository(itensKit).findOne({uid: uid ,codKit: codKit,codItem: codItem });
      const validar3 = await getRepository(itensKit).findOne({codKit: codKit,codItem: codItem, deleted:true});
      const validar2 = await getRepository(itensKit).findOne({ codKit: codKit,codItem: codItem, });

      if(validar){
          //se já estiver cadastrado (tiver uid), passa
      }else if (validar3){
          _itensKit.deleted = false
          _itensKit.uid = validar3.uid;
      }else if(validar2){
              //mas se for novo item, valida
              codKit = null;
              codItem = null;
              super.isRequired(codKit,'Inválido: Item já está cadastrado.');
      }else{
          super.isRequired(codKit,"Selecione o Kit");
          super.isRequired(codItem,"Selecione um Item a adicionar ao Kit");
      } 
      


      _itensKit.codKit = codKit;
      _itensKit.codItem = codItem;
      _itensKit.qtdeItem = qtdeItem

      return(super.save(_itensKit,request));
  }
 

    async onekit(request: Request) {
      //if (this.checkNotPermission(request)) return this.errorRoot;
      return this._repository2.findByIds(request.params.id);
    }
  
}


