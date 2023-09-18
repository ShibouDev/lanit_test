import { PatternController } from './controllers';
import { DocumentController } from './controllers/document';

import { DocumentRoutes, PatternRoutes } from './routes';

import { PatternService } from './services';
import { DocumentService } from './services/document';

import { db } from './utils/connectionPG';
import { Logger } from './utils/logger';

export function di() {
	const logger = new Logger('di');
	logger.info('start');

	function get(instName: string) {
		return inst[instName];
	}

	const inst: { [key: string]: any } = {};

	async function init() {
		logger.info('init');
		await db.connect();
		inst['patternService'] = new PatternService();
		inst['documentService'] = new DocumentService();
		inst['patternController'] = new PatternController(inst['patternService']);
		inst['documentController'] = new DocumentController(inst['documentService']);
		inst['routes'] = [new PatternRoutes(inst['patternController']), new DocumentRoutes(inst['documentController'])];
		logger.info('init finish');
	}
	return {
		init,
		get,
	};
}
