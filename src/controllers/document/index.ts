import { Request, Response } from 'express';
import { DeleteDocumentDTO, GetDocumentDTO } from 'src/dto/document';
import { DocumentService } from '../../services/document';
import { CustomError } from '../../utils/myError';
export class DocumentController {
	constructor(private readonly documentService: DocumentService) {}
	createDocument = async (req: Request, res: Response) => {
		try {
			const document = await this.documentService.create(req.body);
			if (!document) return res.status(400).json(document);
			return res.status(200).json(document);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).json({ msg: error.message });
				return;
			}
			res.status(500).json({ msg: 'Internal Server' });
			return;
		}
	};

	updateDocument = async (req: Request, res: Response) => {
		try {
			const document = await this.documentService.update(req.body);
			if(!document){
				return res.status(400).json()
			}
			return res.status(200).json();
		} catch (error: any) {
			console.log(error)
			if (error instanceof CustomError) {
				res.status(error.statusCode).json({ msg: error.message });
				return;
			}
			res.status(500).json({ msg: 'Internal Server' });
			return;
		}
	};

	getDocumentById = async (req: Request, res: Response) => {
		try {
			const document = await this.documentService.getById(req.params as unknown as GetDocumentDTO);
			return res.status(200).json(document);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).json({ msg: error.message });
				return;
			}
			res.status(500).json({ msg: 'Internal Server' });
			return;
		}
	};

	deleteDocumentById = async (req: Request, res: Response) => {
		try {
			const document = await this.documentService.deleteById(req.params as unknown as DeleteDocumentDTO);
			if (!document) return res.status(400).json();
			return res.status(200).json();
		} catch (error) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).json({ msg: error.message });
				return;
			}
			res.status(500).json({ msg: 'Internal Server' });
			return;
		}
	};
}
