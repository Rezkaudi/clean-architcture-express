import { Pathway } from "../../../domain/entity/pathway.entity";
import { PathwayRepository } from "../../../domain/repository/pathway.repository";

import { UuidGeneratorService } from "../../../infrastructure/srevices/uuid-generator.service";

export class CreatePathwayUseCase {

    constructor(
        private readonly pathwayRepository: PathwayRepository,
        private readonly uuidGeneratorService: UuidGeneratorService,
    ) { }

    execute = async (data: Pathway): Promise<Pathway | null> => {

        const pathwayData: Pathway = {
            _id: this.uuidGeneratorService.generate(),
            userId: data.userId,
            title: data.title || null,
            description: data.description || null,
            species: data.species || null,
            category: data.category || null,
            tissue: data.tissue || null,
            relatedDisease: data.relatedDisease || null,
            diseaseInput: data.diseaseInput || null,
            reactions: data.reactions || null,
            recordDate: data.recordDate || null,
            pubMeds: data.pubMeds || []
        }

        const pathway = await this.pathwayRepository.create(pathwayData);

        return pathway
    }
}
