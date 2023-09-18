import { CreatePatternDTO, GetPatternDTO } from "../../dto/pattern";
import { Pattern } from "../../repo/pattern";
import { db } from "../../utils/connectionPG";

export class PatternService {
  constructor() {}

  create = async (dto: CreatePatternDTO) => {
    const pattern = await db.save(Pattern, dto);
    return pattern;
    // for (const attribute of dto.attributeFields) {
    //   await db.save(AttributesPattern, { ...attribute, pattern: pattern.id });
    // }
  };

  getById = async (dto: GetPatternDTO) => {
    const getPattern = await db.findOne(Pattern, dto, {
      relations: { attributeFields: true },
    });
    return getPattern || {};
  };

  getAll = async () => {
    const getPatterns = await db.getAll(Pattern, {
      relations: { attributeFields: true },
    });
    return getPatterns || [];
  };
}
