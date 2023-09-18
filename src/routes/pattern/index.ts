import { Router } from 'express';
import { PatternController } from '../../controllers/pattern';
import { CreatePatternDTO, GetPatternDTO } from '../../dto/pattern';
import validateBodyDTO from '../../middlewares/validateBodyDTO';
import validateQueryParamsDTO from '../../middlewares/validateQueryParamsDTO';
export class PatternRoutes {
	path = '/api/pattern';
	router = Router();

	constructor(patternContollers: PatternController) {
		this.router.post('/create', validateBodyDTO(CreatePatternDTO), patternContollers.createPattern);
		this.router.get('/getPatterns', patternContollers.getPatterns);
		this.router.get('/:id', validateQueryParamsDTO(GetPatternDTO), patternContollers.getPatternById);
	}
}
