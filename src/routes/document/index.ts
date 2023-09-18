import { Router } from 'express';
import { DocumentController } from '../../controllers/document';
import { CreateDocumentDTO, DeleteDocumentDTO, GetDocumentDTO, UpdateDocumentDTO } from '../../dto/document';
import validateBodyDTO from '../../middlewares/validateBodyDTO';
import validateQueryParamsDTO from '../../middlewares/validateQueryParamsDTO';
export class DocumentRoutes {
	path = '/api/document';
	router = Router();

	constructor(documentContollers: DocumentController) {
		this.router.post('/create', validateBodyDTO(CreateDocumentDTO), documentContollers.createDocument);
		this.router.post('/update', validateBodyDTO(UpdateDocumentDTO), documentContollers.updateDocument);
		this.router.delete('/:id', validateQueryParamsDTO(DeleteDocumentDTO), documentContollers.deleteDocumentById);
		this.router.get('/:id', validateQueryParamsDTO(GetDocumentDTO), documentContollers.getDocumentById);
	}
}
