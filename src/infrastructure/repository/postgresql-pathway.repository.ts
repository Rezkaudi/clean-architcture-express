import Database from "../database/postgreSQL";

import { Pathway } from "../../domain/entity/pathway.entity";
import { PathwayRepository } from "../../domain/repository/pathway.repository";


export class PostgreSQLPathwayRepository implements PathwayRepository {
    private pool = Database.getInstance().getPool();

    create = async (pathway: Pathway): Promise<Pathway> => {
        const query = `
            INSERT INTO pathways (_id, "userId",title,description,species,category,tissue,"relatedDisease","diseaseInput",reactions,"recordDate") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
        `;

        const values = [
            pathway._id,
            pathway.userId,
            pathway.title,
            pathway.description,
            pathway.species,
            pathway.category,
            JSON.stringify(pathway.tissue),
            pathway.relatedDisease,
            JSON.stringify(pathway.diseaseInput),
            JSON.stringify(pathway.reactions),
            pathway.recordDate
        ];

        const result = await this.pool.query(query, values);
        return result.rows[0];
    };


    findById = async (id: string): Promise<Pathway | null> => {
        const query = `SELECT * FROM pathways WHERE _id = $1 LIMIT 1;`;
        const result = await this.pool.query(query, [id]);

        return result.rows[0] || null;
    };

    update = async (id: string, pathway: Partial<Pathway>): Promise<Pathway | null> => {
        const fields = Object.keys(pathway);
        const values = Object.values(pathway);

        if (fields.length === 0) return null;

        const setClause = fields
            .map((field, index) => `"${field}" = $${index + 2}`)
            .join(", ");

        const query = `UPDATE pathways SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE _id = $1 RETURNING *;`;
        const result = await this.pool.query(query, [id, ...values]);
        return result.rows[0] || null;
    };

    delete = async (id: string): Promise<void> => {
        const query = `DELETE FROM pathways WHERE _id = $1;`;
        await this.pool.query(query, [id]);
    };
}