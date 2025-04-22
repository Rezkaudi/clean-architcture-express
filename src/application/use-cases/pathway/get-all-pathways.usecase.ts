import { Pathway } from "../../../domain/entity/pathway.entity";
import { PathwayRepository } from "../../../domain/repository/pathway.repository";

export class GetAllPathwaysUseCase {
    constructor(
        private readonly pathwayRepository: PathwayRepository
    ) {}

    execute = async (userId: string): Promise<Pathway[]> => {
        const pathways = await this.pathwayRepository.findByUserId(userId);
        return pathways;
    }
}