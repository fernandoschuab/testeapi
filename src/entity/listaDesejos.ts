import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, PrimaryColumn, ManyToOne, Unique} from "typeorm";
import {cadastrosUsuarios} from "./cadastrosUsuarios"
import { BaseEntity } from "./BaseEntity";

import { itens } from "./itens";

@Entity({ name: 'listadesejos' })
@Unique(["codCadastro", "codItem"])
export class listaDesejos extends BaseEntity {
    
    @ManyToOne(type => cadastrosUsuarios,{ eager: true }) //Autopopulate
    @JoinColumn({ referencedColumnName: "uid", name: 'codCadastro'/*a ser exibido na tab*/})
    codCadastro: string;

    @ManyToOne(type => itens, { eager: true }) //Autopopulate
    @JoinColumn({ referencedColumnName: "uid", name: 'codItem'/*a ser exibido na tab*/})
    codItem: string;

    
}