import { Expose, Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

class AttributeFieldsCreateDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  value: string;
}
class AttributeFieldsUpdateDTO {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  @IsOptional()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  value: string;
}

export class CreateDocumentDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  template: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => AttributeFieldsCreateDTO)
  attributeFields: AttributeFieldsCreateDTO[];
}
export class UpdateDocumentDTO {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => AttributeFieldsUpdateDTO)
  attributeFields?: AttributeFieldsUpdateDTO[];
}

export class GetDocumentDTO {
  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;
}

export class DeleteDocumentDTO {
  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;
}
