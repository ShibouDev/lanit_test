import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Document } from "./document";
@Entity()
export class AttributesDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(() => Document, (document) => document.attributeFields, {
    onDelete: "CASCADE",
  })
  document: Document;
}
