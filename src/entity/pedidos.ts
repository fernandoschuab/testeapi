import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { statuspedido } from "./enum/statuspedido";
import { formapagamento } from "./enum/formaPagamento";
import { BaseEntity } from "./BaseEntity";
import { cadastrosUsuarios } from "./cadastrosUsuarios";

@Entity({ name: 'pedidos' })
export class pedidos extends BaseEntity {
    @ManyToOne(type => cadastrosUsuarios,{ eager: true })//Autopopulate
    @JoinColumn({ referencedColumnName: "uid", name: 'codCadastro'/*a ser exibido na tab*/})
    codCadastro: string;

    @Column({default:1})
    statusPedido: statuspedido ;

    @Column()
    precoTotalPedido: number;

    @Column({nullable: true} )
    descontoAplicado: number;

    @Column()
    formaPagamento: formapagamento; 

}
    
