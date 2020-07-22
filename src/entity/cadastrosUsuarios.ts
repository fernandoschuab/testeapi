import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, Unique} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { BasePessoa } from "./BasePessoa";

@Entity({ name: 'cadastrosusuarios' })
@Unique(["email"])

export class cadastrosUsuarios extends BasePessoa {

    @Column({ type: 'varchar', length: 200, nullable: true  })
    foto: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 11, nullable: true })
    telefone: string;
    
    @Column({ type: 'varchar', length: 100, select: false  })
    senha: string;



}

