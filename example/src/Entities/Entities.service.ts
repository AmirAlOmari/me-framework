import { Service } from "../../..";

import { EntitiesResource } from "./Entities.resource";
import { EntitiesModel } from "./Entities.model";

@Service()
export class EntitiesService {
	constructor(
		public entitiesResource: EntitiesResource,
		public entitiesModel: EntitiesModel
	) {
		// super();
	}

	// public async create(value: string) {
	// 	return this.entitiesModel.create({ key: value }).then(entity => {
	// 		return entity.toObject();
	// 	});
	// }

	public async hi() {
		return Promise.all([
			this.entitiesModel.modelRef
				.find({})
				.countDocuments()
				.exec(),
			this.entitiesResource.getHiString(),
		])
			.then(([count, hiString]) => {
				const answer = Array(count!)
					.fill(0)
					.map(() => hiString + "\n");

				return answer;
			})
			.catch(error => {
				throw {
					...error,
				};
			});
	}
}
