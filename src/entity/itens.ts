import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { formapagamento } from "./enum/formaPagamento";
import { codquant } from "./enum/quantidade";
import { categorias } from "./categorias";
import { tipoproduto } from "./enum/tipoproduto";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: 'itens' })
@Unique(["nomeItem"])
export class itens extends BaseEntity {
    @Column({ type: 'varchar', length: 300, nullable: true  })
    nomeItem: string;

    @ManyToOne(type => categorias, {nullable: true, eager: true})
    @JoinColumn({ referencedColumnName: "uid", name: 'codCategoria'})
    codCategoria: categorias;
    
    @Column({nullable: true})
    tipoProduto: tipoproduto;

    @Column({nullable: true})
    codQuant: codquant;

    @Column({nullable: false, default: 0.01 })
    preco: number;

    @Column({ type: 'varchar', length: 2000, nullable: true  })
    descricaoItem: string;
    @Column({ type: 'varchar', length: 2000, nullable: true  })
    foto: string;



}
    
