import { Request, Response } from 'express';
import { GetPatternDTO } from 'src/dto/pattern';
import { PatternService } from '../../services/pattern';
import { CustomError } from '../../utils/myError';

export class PatternController {
	constructor(private readonly patternService: PatternService) {}

	createPattern = async (req: Request, res: Response) => {
		try {
			const pattern = await this.patternService.create(req.body);
			return res.status(201).json(pattern);
		} catch (error) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).json({ msg: error.message });
				return;
			}
			res.status(500).json({ msg: 'Internal Server' });
			return;
		}
	};

	getPatternById = async (req: Request, res: Response) => {
		try {
			const pattern = await this.patternService.getById(req.params as unknown as GetPatternDTO);
			return res.status(200).json(pattern);
		} catch (error) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).json({ msg: error.message });
				return;
			}
			res.status(500).json({ msg: 'Internal Server' });
			return;
		}
	};

	getPatterns = async (req: Request, res: Response) => {
		try {
			const patterns = await this.patternService.getAll();
			return res.status(200).json(patterns);
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
