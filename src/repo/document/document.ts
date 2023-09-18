import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pattern } from "../pattern/pattern";
import { AttributesDocument } from "./attributes";
@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Pattern, (pattern) => pattern.id)
  @JoinColumn()
  template: Pattern;

  @OneToMany(() => AttributesDocument, (attribute) => attribute.document, {
    eager: true,
    cascade: true,
  })
  attributeFields: AttributesDocument[];
}
