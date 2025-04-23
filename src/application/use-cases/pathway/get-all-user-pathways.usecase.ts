import { PathwayWithPaginationDTO } from "../../dtos/pathway.dto";

import { PathwayRepository } from "../../../domain/repository/pathway.repository";

export class GetAllUserPathwaysUseCase {

    constructor(
        private readonly pathwayRepository: PathwayRepository
    ) { }

    execute = async (userId: string, limit: number, offset: number): Promise<PathwayWithPaginationDTO> => {

        const pathway = await this.pathwayRepository.findByUserId(userId, limit, offset);

        return pathway
    }
}
