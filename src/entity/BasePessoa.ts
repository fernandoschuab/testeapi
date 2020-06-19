import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { genero } from "./enum/genero";

export abstract class BasePessoa extends BaseEntity {
    @Column({ type: 'varchar', length: 100 })
    nomePessoa: string;

    @Column({ type: 'varchar', length: 100 })
    sobrenomePessoa: string;

    @Column()
    dataNasc:Date;

    @Unique(["cpf"])
    @Column({ type: 'varchar', length: 11, nullable: true  })
    cpf: string;
    
    @Column()
    generoPessoa: genero;

}