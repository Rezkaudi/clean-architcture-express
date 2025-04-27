import { Pathway } from "../entity/pathway.entity";

import { FilterPathwayDTO, PathwayWithPaginationDTO } from "../../application/dtos/pathway.dto";

export interface PathwayRepository {
    getAll(limit: number, offset: number, filters: FilterPathwayDTO): Promise<PathwayWithPaginationDTO>;
    delete(id: string): Promise<void>;
    create(pathway: Pathway): Promise<Pathway>;
    findById(id: string): Promise<Pathway | null>;
    findByUserId(userId: string, limit: number, offset: number, filters: FilterPathwayDTO): Promise<PathwayWithPaginationDTO>;
    update(id: string, pathway: Partial<Pathway>): Promise<Pathway | null>;
}