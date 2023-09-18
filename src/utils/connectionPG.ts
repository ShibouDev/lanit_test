import { DataSource, DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';
import { Logger } from './logger';
class SetupConnection {
	private _appDataSource: DataSource;
	private logger = new Logger(SetupConnection.name);

	async connect() {
		this._appDataSource = new DataSource({
			name: 'default',
			type: 'postgres',
			url: process.env.DATABASE_URL,
			synchronize: true,
			logging: false,
			entities: ['src/repo/**/*.ts'],
		});

		try {
			await this._appDataSource.initialize();
			this.logger.info('Data Source has been initialized!');
		} catch (err) {
			this.logger.error('Error during Data Source initialization', err);
		}
	}

	get dataSource() {
		return this._appDataSource;
	}

	async save(entity: EntityTarget<ObjectLiteral>, record: DeepPartial<ObjectLiteral>) {
		const repository = db.dataSource.getRepository(entity);
		return repository.save(record);
	}

	async update(entity: EntityTarget<ObjectLiteral>, criteria: DeepPartial<ObjectLiteral>, record: DeepPartial<ObjectLiteral>) {
		const repository = db.dataSource.getRepository(entity);
		return repository.update(criteria, record);
	}

	async findOne(
		entity: EntityTarget<ObjectLiteral>,
		record: DeepPartial<ObjectLiteral>,
		settings?: DeepPartial<ObjectLiteral>
	) {
		const repository = db.dataSource.getRepository(entity);
		return repository.findOne({
			where: record,
			...settings,
		});
	}

	async find(
		entity: EntityTarget<ObjectLiteral>,
		record: DeepPartial<ObjectLiteral>,
		settings?: DeepPartial<ObjectLiteral>
	) {
		const repository = db.dataSource.getRepository(entity);
		return repository.find({
			where: record,
			...settings,
		});
	}

	async getAll(entity: EntityTarget<ObjectLiteral>, settings?: DeepPartial<ObjectLiteral>) {
		const repository = db.dataSource.getRepository(entity);
		return repository.find({
			...settings,
		});
	}

	async delete(entity: EntityTarget<ObjectLiteral>, filter: DeepPartial<ObjectLiteral>) {
		const repository = db.dataSource.getRepository(entity);
		return repository.delete(filter);
	}
}

export const db = new SetupConnection();
