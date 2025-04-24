import { NotFoundError } from "../../errors/application-error";

import { Pathway } from "../../../domain/entity/pathway.entity";

import { PathwayRepository } from "../../../domain/repository/pathway.repository";

export class UpdatePathwayUseCase {

    constructor(
        private readonly pathwayRepository: PathwayRepository,
    ) { }

    execute = async (pathwayId: string, userId: string, updatedPathwayData: Partial<Pathway>): Promise<Pathway | null> => {
        const existPathway = await this.pathwayRepository.findById(pathwayId);

        if (!existPathway) {
            throw new NotFoundError("Pathway not found");
        }

        if (userId !== existPathway.userId) {
            throw new NotFoundError("this Pathway not for you");
        }

        const pathway = await this.pathwayRepository.update(pathwayId, updatedPathwayData);

        return pathway
    }
}
