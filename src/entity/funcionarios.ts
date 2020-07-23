import { Entity, Column, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: 'funcionarios' })
export class funcionarios extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @Column({ type: 'varchar', length: 100 })
    sobrenome: string;

    @Column({ type: 'varchar', length: 200 })
    cargo: string;

    @Column({ type: 'varchar', length: 200, nullable: true   })
    foto: string;

    @Unique(["cpf"])
    @Column({ type: 'varchar', length: 11, nullable: true  })
    cpf: string;
    
    @Unique(["email"])
    @Column({ type: 'varchar', length: 200 })
    email: string;

    @Column({ default: false })
    isRoot: boolean;

    @Column({ type: 'varchar', length: 100 , select: false })
    senha: string;

}


