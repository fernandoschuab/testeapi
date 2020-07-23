import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";

import { statuspedido } from "./enum/statuspedido";
import { formapagamento } from "./enum/formaPagamento";
import { BaseEntity } from "./BaseEntity";
import { cadastrosUsuarios } from "./cadastrosUsuarios";
import { enderecoCadastro } from "./enderecoCadastro";

@Entity({ name: 'pedidos' })
@Unique(["codPedido"])
export class pedidos extends BaseEntity {
    
    @Column({nullable:false,  type: 'varchar', length: 300 })
    codPedido: string;
    

    @ManyToOne(type => cadastrosUsuarios,{ eager: true })//Autopopulate
    @JoinColumn({ referencedColumnName: "uid", name: 'codCadastro'/*a ser exibido na tab*/})
    codCadastro: string;

    @ManyToOne(type => enderecoCadastro,{ nullable: false,eager: true })//Autopopulate
    @JoinColumn({ referencedColumnName: "uid", name: 'endereco'/*a ser exibido na tab*/})
    endereco: string;

    @Column({default:1})
    statusPedido: statuspedido ;

    @Column({nullable: false, type: "float", precision: 2, default: 0.01 })
    precoTotalPedido: number;

    @Column({nullable: true} )
    descontoAplicado: number;

    @Column()
    formaPagamento: formapagamento; 

}
    
