import { BaseController } from "./BaseController";
import {NextFunction, Request, Response} from "express";
import { getRepository, Repository, Raw } from "typeorm";
import { pedidos } from "../entity/pedidos";
import { statuspedido } from "../entity/enum/statuspedido";
import { O_RDONLY } from "constants";

export class PedidoController extends BaseController<pedidos> {
  private _repository2: Repository<pedidos>;
    constructor(){
        super(pedidos,false); 
        this._repository2 = getRepository<pedidos>(pedidos);   
    };
    // async all(request: Request) {
    //     let { pedidoUid } = request.params
        
    //     if (!pedidoUid)
    //       return { status: 400, message: 'Informe o código da requisiçao' }
    
    //     this._repository2.find({
    //       uid: pedidoUid
    //     })
    //   }
     
      async status(request: Request) {
        let {pedidoStatus} = request.params;
        let num = pedidoStatus*1;
        if (!pedidoStatus)
          return { status: 400, message: 'Informe o status da requisiçao' }
        else{
          if(pedidoStatus==99){
            return this._repository2.find({
              where: [
                {statusPedido: 6},
                {statusPedido: 7},
                {statusPedido: 8}
              ]
            })
          }else{
            return this._repository2.find({
              statusPedido: pedidoStatus
            })
          }
          
        }
        
      }
    async salvar(request: Request) {
      console.log('request',request.body);
        let _request = <pedidos>request.body;
        _request.descontoAplicado = 0; //por enquanto não implementamos cupons de desconto
    
        // super.isRequired(_request.codCadastro, 'Preciso saber quem é você. Faça login');
        // super.isRequired(_request.formaPagamento, 'Informe a forma pagamento');
        // super.isRequired(_request.precoTotalPedido, 'Erro com preço total');
        if(_request.precoTotalPedido <= 0)
            return {status: 404, message: 'Pedido Inválido'};

        if (!_request.statusPedido)
          _request.statusPedido = 1;
        return super.save(_request, request);
      }
      async meus(request: Request) {
        return this._repository2.find({
          codCadastro: request.params.id,
        })
      }

}