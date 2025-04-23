import { BadRequestError } from "../../errors/application-error";
import { PathwayRepository } from "../../../domain/repository/pathway.repository";

export class DeletePathwayUseCase {

    constructor(
        private readonly pathwayRepository: PathwayRepository
    ) { }

    execute = async (id: string): Promise<void> => {

        const parhway = await this.pathwayRepository.findById(id);

        if (!parhway) {
            throw new BadRequestError("Parhway Not Found");
        }

        await this.pathwayRepository.delete(id);
    }
}
