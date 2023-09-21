import { AttributeFieldsPattern } from 'src/interfaces';
import { CreateDocumentDTO, DeleteDocumentDTO, GetDocumentDTO, UpdateDocumentDTO } from '../../dto/document';
import { AttributesDocument, Document } from '../../repo/document';
import { Pattern } from '../../repo/pattern';
import { db } from '../../utils/connectionPG';
export class DocumentService {
	constructor() {}

	create = async (dto: CreateDocumentDTO) => {
		const pattern = await db.findOne(Pattern, { id: dto.template }, { relations: { attributeFields: true } });
		if (!pattern) {
			return false;
		}
		const checkTypes = pattern.attributeFields
			.map((el: AttributeFieldsPattern, i: number) => {
				const value = dto.attributeFields[i].value;
				if (el.type === 'date') {
					if (typeof value === 'string' && value.length === 13) {
						return true;
					}
					return false;
				}
				if (el.type === 'number') {
					return !!Number(value);
				}
				if (el.type === 'string' && typeof value === 'string') {
					return true;
				}
				return false;
			})
			.every((v: AttributeFieldsPattern) => v);
		if (!checkTypes) {
			return false;
		}
		const document = await db.save(Document, dto);
		return document;
	};

	getById = async (dto: GetDocumentDTO) => {
		const getDocument = await db.findOne(Document, dto, {
			relations: { attributeFields: true },
		});
		return getDocument || {};
	};

	update = async (dto: UpdateDocumentDTO) => {
		const getDocument = await db.findOne(Document, { id: dto.id });
		if (!getDocument) {
			return false;
		}
		if (dto.name && getDocument.name !== dto.name) {
			await db.update(Document, { id: dto.id }, { name: dto.name });
		}
		if (dto.attributeFields) {
			for (const attribute of dto.attributeFields) {
				await db.update(AttributesDocument, { id: attribute.id }, attribute);
			}
		}
		return true;
	};

	deleteById = async (dto: DeleteDocumentDTO) => {
		const findDocument = await db.findOne(Document, dto);
		if (!findDocument) {
			return false;
		}
		await Promise.all([
			db.delete(AttributesDocument, {
				document: dto.id,
			}),
			db.delete(Document, { id: dto.id }),
		]);
		return true;
	};
}
