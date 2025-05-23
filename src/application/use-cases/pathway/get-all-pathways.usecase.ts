import { FilterPathwayDTO, PathwayWithPaginationDTO } from "../../dtos/pathway.dto";

import { PathwayRepository } from "../../../domain/repository/pathway.repository";

export class GetAllPathwaysUseCase {

    constructor(
        private readonly pathwayRepository: PathwayRepository
    ) { }

    execute = async (limit: number, offset: number, filters: FilterPathwayDTO): Promise<PathwayWithPaginationDTO> => {

        const data = await this.pathwayRepository.getAll(limit, offset, filters);

        return data
    }
}
