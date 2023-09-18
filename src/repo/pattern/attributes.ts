import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pattern } from "./pattern";
@Entity()
export class AttributesPattern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => Pattern, (pattern) => pattern.attributeFields)
  pattern: Pattern;
}
