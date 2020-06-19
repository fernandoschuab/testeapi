import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { statuspedido } from "./enum/statuspedido";
import { formapagamento } from "./enum/formaPagamento";
import { itens } from "./itens";
import { pedidos } from "./pedidos";
import {BaseEntity} from "./BaseEntity"

@Entity({ name: 'itenspedidos' })
@Unique(["codItem", "codPedido"])
export class itenspedidos extends BaseEntity {
    @ManyToOne(type => pedidos, { eager: true })
    @JoinColumn({ referencedColumnName: "uid", name: 'codPedido'/*nome a ser exibido no bd*/})
    codPedido: string;

    @ManyToOne(type => itens, { eager: true })
    @JoinColumn({ referencedColumnName: "uid", name: 'codItem'/*nome a ser exibido no bd*/})
    codItem: string;

    @Column()
    quantidadeProduto: number;

    @Column()
    precoTotalItem: number;




}
    
