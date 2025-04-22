import { Pathway } from "../entity/pathway.entity";

export interface PathwayRepository {
    create(pathway: Pathway): Promise<Pathway>;
    findById(id: string): Promise<Pathway | null>;
    update(id: string, pathway: Partial<Pathway>): Promise<Pathway | null>;
    delete(id: string): Promise<void>;
}