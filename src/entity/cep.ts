import { PrimaryColumn, BaseEntity, Column, Entity, OneToMany } from "typeorm";
@Entity({ name: 'cep' })
export class cep{
 
    @PrimaryColumn()
    cep: string;
    
    @Column({ type: 'varchar', length: 600, nullable: true  })
    cidade: string;

    @Column({ type: 'varchar', length: 600, nullable: true  })
    logradouro: string;
    
  
    @Column({ type: 'varchar', length: 600, nullable: true  })
    complemento: string;

    @Column({ type: 'varchar', length: 600, nullable: true  })
    bairro: string;

    @Column({ type: 'varchar', length: 2,  })
    uf: string;

    @Column({default: false})
    entregaNesteCep: boolean;


}
    