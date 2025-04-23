import { Pathway } from "../entity/pathway.entity";

import { PublicPathwayDTO } from "../../application/dtos/pathway.dto";

export interface PathwayRepository {
    getAll(): Promise<PublicPathwayDTO[]>;
    delete(id: string): Promise<void>;
    create(pathway: Pathway): Promise<Pathway>;
    findById(id: string): Promise<Pathway | null>;
    findByUserId(userId: string): Promise<PublicPathwayDTO[]>;
    update(id: string, pathway: Partial<Pathway>): Promise<Pathway | null>;
}