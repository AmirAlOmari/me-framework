import { Controller, IRequest, IResponse } from "../../..";

import { EntitiesService } from "./Entities.service";

@Controller()
export class EntitiesController {
	constructor(public entitiesService: EntitiesService) {
		// super();
	}

	// public create() {
	// 	return (req: IRequest, res: IResponse) => {
	// 		this.entitiesService
	// 			.create(req.query.value || "'value_wasnt_provided'")
	// 			.then(entity => {
	// 				console.log(entity);

	// 				return res.status(200).send(entity);
	// 			})
	// 			.catch(error => {
	// 				console.log(error);

	// 				return res.status(500).send(error);
	// 			});
	// 	};
	// }

	// public hi() {
	// 	return (req: IRequest, res: IResponse) =>
	// 		this.entitiesService
	// 			.hi()
	// 			.then(answer => {
	// 				console.log(answer);

	// 				return res.status(200).send(answer);
	// 			})
	// 			.catch(error => {
	// 				console.error(error);

	// 				return res.status(500).send(error);
	// 			});
	// }
}
