import { CadastroController } from "./controller/CadastroController";
import { CategoriaController } from "./controller/CategoriaController";
import {BaseController} from "./controller/BaseController"
import {itensController } from "./controller/ItensController";
import {ItensKitController } from "./controller/ItensKitController";
import { KitController } from "./controller/kitControler";
import { PedidoController } from "./controller/PedidoController";
import { PedidoItensController } from "./controller/PedidoItensController";
import { StorageController } from "./controller/StorageController";
import { FuncionariosController } from "./controller/FuncionariosController";

export const Routes = [
    { method: "get", route: "/storage/:filename", controller: StorageController, action: "getFile" },
    
    { method: "get", route: "/cadastrousuarios", controller: CadastroController, action: "all" },
    { method: "get", route: "/cadastrousuarios/:id", controller: CadastroController, action: "one" },
    { method: "post", route: "/cadastrousuarios", controller: CadastroController, action: "save" },
    { method: "post", route: "/cadastrousuarios/auth", controller: CadastroController, action: "auth" },
    { method: "post", route: "/cadastrousuarios/:id", controller: CadastroController, action: "save" },
    { method: "post", route: "/cadastrousuarios/create", controller: CadastroController, action: "save" },

    { method: "delete", route: "/cadastrousuarios/:id", controller: CadastroController, action: "remove" },
    

    { method: "get", route: "/itens", controller: itensController, action: "all" },
    { method: "get", route: "/itens/:id", controller: itensController, action: "one" },
    { method: "get", route: "/porcategoria/:id", controller: itensController, action: "porCategoria" },
    { method: "get", route: "/kits", controller: itensController, action: "kits" },
    { method: "get", route: "/nokits", controller: itensController, action: "nokits" },
    { method: "post", route: "/itens/:id", controller: itensController, action: "save" },
    { method: "post", route: "/itens", controller: itensController, action: "save" },
    { method: "post", route: "/estoque", controller: itensController, action: "estoque" },
    { method: "post", route: "/estoque/:id", controller: itensController, action: "estoque" },
    { method: "delete", route: "/itens/:id", controller: itensController, action: "remove" },

    { method: "get", route: "/kititens", controller: ItensKitController, action: "all" },
    { method: "get", route: "/kititens/all/:id", controller: ItensKitController, action: "itenskits" },
    { method: "get", route: "/kititens/:id", controller: ItensKitController, action: "itenskits" },
    { method: "post", route: "/kititens/:id", controller: ItensKitController, action: "save" },
    { method: "post", route: "/kititens", controller: ItensKitController, action: "save" },
    { method: "delete", route: "/kititens/:id", controller: ItensKitController, action: "remove" },

    { method: "get", route: "/kit", controller: KitController, action: "all" },
    { method: "get", route: "/kit/:id", controller: KitController, action: "itenskits" },
    { method: "post", route: "/kit", controller: KitController, action: "save" },
    { method: "post", route: "/kit/:id", controller: KitController, action: "save" }, 
    { method: "delete", route: "/kit/:id", controller: KitController, action: "remove" },


    { method: "get", route: "/categoria", controller: CategoriaController, action: "all" },
    { method: "get", route: "/categoria/:id", controller: CategoriaController, action: "one" },
    { method: "post", route: "/categoria", controller: CategoriaController, action: "save" },
    { method: "delete", route: "/categoria/:id", controller: CategoriaController, action: "remove" },


    
    { method: "get", route: "/endereco/:id", controller: CadastroController, action: "todosMeus" },
    { method: "post", route: "/endereco", controller: CadastroController, action: "AdicionarEndereco" },
    { method: "post", route: "/endereco/:id", controller: CadastroController, action: "save" },
    { method: "delete", route: "/endereco/:id", controller: CadastroController, action: "remove" },

    { method: "get", route: "/pedido", controller: PedidoController, action: "all" },
    { method: "get", route: "/pedido/:pedidoStatus/all", controller: PedidoController, action: "status" },
    //{ method: "get", route: "/pedido/:id", controller: PedidoController, action: "one" },
    //{ method: "get", route: "/pedido/:pedidoStatus", controller: PedidoController, action: "status" },
    
    { method: "post", route: "/pedido", controller: PedidoController, action: "save" },
    { method: "delete", route: "/pedido/:id", controller: PedidoController, action: "remove" },

    { method: "get", route: "/pedidoitens/:pedidoUid/all", controller: PedidoItensController, action: "all" },
    { method: "post", route: "/pedidoitens", controller: PedidoItensController, action: "save" },
    { method: "delete", route: "/pedidoitens/:id", controller: PedidoItensController, action: "remove" },
    
    { method: "get", route: "/funcionarios", controller: FuncionariosController, action: "all" },
    { method: "get", route: "/funcionarios/:id", controller: FuncionariosController, action: "one" },
    { method: "post", route: "/funcionarios/auth", controller: FuncionariosController, action: "auth" },
    { method: "post", route: "/funcionarios", controller: FuncionariosController, action: "save" },
    { method: "post", route: "/funcionarios/:id", controller: FuncionariosController, action: "save" },
    { method: "delete", route: "/funcionarios/:id", controller: FuncionariosController, action: "remove" }
    
    
/*
    { method: "get", route: "/questions", controller: QuestionController, action: "all" },
    { method: "get", route: "/questions/:id", controller: QuestionController, action: "one" },
    { method: "post", route: "/questions", controller: QuestionController, action: "save" },
    { method: "delete", route: "/questions/:id", controller: QuestionController, action: "remove" }

*/
];

