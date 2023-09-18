import { Expose, Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNumber,
  IsString,
  ValidateNested
} from "class-validator";

class AttributeFieldsDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  @IsIn(["string", "number", "date"])
  type: string;
}

export class CreatePatternDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => AttributeFieldsDTO)
  attributeFields: AttributeFieldsDTO[];
}

export class GetPatternDTO {
  @Expose()
  @Transform(({value})=> Number(value))
  @IsNumber()
  id: number;
}
