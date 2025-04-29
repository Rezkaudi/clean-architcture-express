import { Pathway } from "../../../domain/entity/pathway.entity";
import { PathwayRepository } from "../../../domain/repository/pathway.repository";
import { NotFoundError } from "../../errors/application-error";

export class GetPathwayByIdUseCase {
    constructor(
        private readonly pathwayRepository: PathwayRepository
    ) {}

    execute = async (id: string): Promise<Pathway> => {
        const pathway = await this.pathwayRepository.findById(id);
        
        if (!pathway) {
            throw new NotFoundError("Pathway not found");
        }
        
        return pathway;
    }
}