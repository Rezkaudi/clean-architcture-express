import { PublicPathwayDTO } from "../../dtos/pathway.dto";

import { PathwayRepository } from "../../../domain/repository/pathway.repository";

export class GetAllUserPathwaysUseCase {

    constructor(
        private readonly pathwayRepository: PathwayRepository
    ) { }

    execute = async (userId: string): Promise<PublicPathwayDTO[]> => {

        const pathway = await this.pathwayRepository.findByUserId(userId);

        return pathway
    }
}
