import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, Unique } from "typeorm";
import { formapagamento } from "./enum/formaPagamento";
import { codquant } from "./enum/quantidade";
import { categorias } from "./categorias";
import { itens } from "./itens";
import { BaseEntity } from "./BaseEntity";


@Entity({ name: 'itenskit' })
@Unique(["codKit", "codItem"])
export class itensKit extends BaseEntity{

    @ManyToOne(type => itens, {eager: true})
    @JoinColumn({ referencedColumnName: "uid", name: 'codKit'})
    codKit: string;

    @ManyToOne(type => itens,  {eager: true})
    @JoinColumn({ referencedColumnName: "uid", name: 'codItem'})
    codItem: string;

    @Column()
    qtdeItem: number;


}
    