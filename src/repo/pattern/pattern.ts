import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AttributesPattern } from "./attributes";
@Entity()
export class Pattern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AttributesPattern, (attribute) => attribute.pattern, {
    eager: true,
    cascade: true,
  })
  attributeFields: AttributesPattern[];
}
