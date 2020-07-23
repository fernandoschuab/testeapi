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
      async save(request: Request) {
        let _request = <itenspedidos>request.body;
        
        // super.isRequired(_request.codPedido, 'Informe o Pedido');
        // super.isRequired(_request.codItem, 'Informe o item');
        // super.isRequired(_request.quantidadeProduto, 'Informe a quantidade do item');
        // super.isRequired(_request.precoTotalItem, 'Erro preço produto');
        return super.save(_request, request);
      }
    
     

}