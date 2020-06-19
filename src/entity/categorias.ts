import {BaseEntity} from "./BaseEntity";
import { Entity, Column, Unique } from "typeorm";
@Entity({ name: 'categorias' })
@Unique(["categoria"])
export class categorias extends BaseEntity{
    @Column({ type: 'varchar', length: 200 })
    categoria: string;
    @Column({ type: 'varchar', length: 1000, nullable: true })
    descricaoCategoria: string;


}