export interface AttributeFieldsPattern {
	id: number;
	name: string;
	type: string;
}

export interface Pattern {
	id: number;
	name: string;
	attributeFields: AttributeFieldsPattern[];
}
