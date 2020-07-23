import { BaseController } from "./BaseController";
import {NextFunction, Request, Response} from "express";
import { itensKit } from "../entity/itensKit";
import { getRepository, Repository } from "typeorm";
import { pedidos } from "../entity/pedidos";
import { itenspedidos } from "../entity/itensPedido";

export class PedidoItensController extends BaseController<itenspedidos> {
  private _repository2: Repository<itenspedidos>;
    constructor(){
        super(pedidos,false); 
        this._repository2 = getRepository<itenspedidos>(itenspedidos);   
    };
    async all(request: Request) {
        let { pedidoUid } = request.params
        
        if (!pedidoUid)
          return { status: 400, message: 'Informe o código da requisiçao' }
    
        this._repository2.find({
          uid: pedidoUid
        })
      }
      save2(request: Request) {

        let{ codPedido, codItem,quantidadeProduto, precoTotalItem} = request.body;
    
        let _itenspedidos = new itenspedidos();
        _itenspedidos.codPedido = codPedido;
        console.log('passei até aqui')
        //_itenspedidos.uid = request.uid;
        super.isRequired(_itenspedidos.codPedido, request.body);
        super.isRequired(_itenspedidos.codItem, 'Informe o item');
        super.isRequired(_itenspedidos.quantidadeProduto, 'Informe a quantidade do item');
        super.isRequired(_itenspedidos.precoTotalItem, 'Erro preço produto');
        return (super.save(_itenspedidos, request));
      }
    
     

}