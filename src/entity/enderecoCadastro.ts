import { PrimaryColumn, Column, ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CEP } from "./cep";
import { cadastrosUsuarios } from "./cadastrosUsuarios";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: 'enderecocadastro' })
export class enderecoCadastro extends BaseEntity {
    
    @ManyToOne(type => cadastrosUsuarios)
    @JoinColumn({ referencedColumnName: "uid", name: 'codCadastro'/*a ser exibido na tab*/})
    codCadastro: string;
    
    @Column({ type: 'varchar', length: 300 })
    logradouro: string;

    @Column({ type: 'varchar', length: 100, nullable: true  })
    complementoEndereco: string;

    @Column({nullable:false})
    numEndereco:number;

    @Column({ type: 'varchar', length: 100 })
    bairroEndereco: string;

     @ManyToOne(type => CEP, CEP => CEP.cep, {nullable:false})
    @JoinColumn({name: 'cep'})
    cep: CEP;
    
    @Column({ default: false })
    naoEntregaNesteLocal: boolean;

    @Column({ type: 'varchar', length: 1000, nullable: true, default: "" })
    obsNaoEntrega: string;
}