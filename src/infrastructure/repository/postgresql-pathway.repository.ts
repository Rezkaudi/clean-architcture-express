import Database from "../database/postgreSQL";

import { Pathway } from "../../domain/entity/pathway.entity";
import { PathwayRepository } from "../../domain/repository/pathway.repository";
import { PathwayWithPaginationDTO } from "../../application/dtos/pathway.dto";


export class PostgreSQLPathwayRepository implements PathwayRepository {
    private pool = Database.getInstance().getPool();

    getAll = async (limit: number, offset: number): Promise<PathwayWithPaginationDTO> => {
        const dataQuery = `
        SELECT 
            _id,
            title,
            description,
            species,
            category,
            tissue,
            "relatedDisease",
            "diseaseInput",
            reactions,
            "recordDate"
        FROM pathways
        ORDER BY "recordDate" DESC
        LIMIT $1 OFFSET $2;
    `;
        const countQuery = `SELECT COUNT(*) FROM pathways;`;


        const [result, total] = await Promise.all([
            this.pool.query(dataQuery, [limit, offset]),
            this.pool.query(countQuery)
        ]);

        const pathways = result.rows
        const totalCount = parseInt(total.rows[0].count, 10);

        return { totalCount, pathways };
    };

    delete = async (id: string): Promise<void> => {
        const query = `DELETE FROM pathways WHERE _id = $1;`;
        await this.pool.query(query, [id]);
    };

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
            pathway.tissue,
            pathway.relatedDisease,
            pathway.diseaseInput,
            pathway.reactions,
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

    findByUserId = async (userId: string, limit: number, offset: number): Promise<PathwayWithPaginationDTO> => {

        const dataQuery = `
        SELECT 
            _id,
            title,
            description,
            species,
            category,
            tissue,
            "relatedDisease",
            "diseaseInput",
            reactions,
            "recordDate"
        FROM pathways
        WHERE "userId" = $3
        ORDER BY "recordDate" DESC
        LIMIT $1 OFFSET $2;
    `;
        const countQuery = `SELECT COUNT(*) FROM pathways;`;


        const [result, total] = await Promise.all([
            this.pool.query(dataQuery, [limit, offset, userId]),
            this.pool.query(countQuery)
        ]);

        const pathways = result.rows
        const totalCount = parseInt(total.rows[0].count, 10);

        return { totalCount, pathways };
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

}



// getAll = async (limit: number, offset: number, filters: FilterPathwayDTO): Promise<PathwayWithPaginationDTO> => {

//     let conditions: string[] = [];
//     let values: any[] = [];
//     let idx = 1;

//     if (filters.search) {
//         conditions.push(`(LOWER(title) LIKE LOWER($${idx}) OR LOWER(description) LIKE LOWER($${idx}))`);
//         values.push(`%${filters.search}%`);
//         idx++;
//     }

//     if (filters.category) {
//         conditions.push(`category = $${idx}`);
//         values.push(filters.category);
//         idx++;
//     }

//     if (filters.status) {
//         conditions.push(`status = $${idx}`);
//         values.push(filters.status);
//         idx++;
//     }

//     if (filters.date) {
//         // Filter by formatted recordDate like '1.1.2024'
//         conditions.push(`TO_CHAR("recordDate", 'FMDD.FMMM.YYYY') = $${idx}`);
//         values.push(filters.date);
//         idx++;
//     }

//     const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

//     const dataQuery = `
//     SELECT 
//         _id,
//         title,
//         description,
//         species,
//         category,
//         status,
//         tissue,
//         "relatedDisease",
//         "diseaseInput",
//         reactions,
//         TO_CHAR("recordDate", 'FMDD.FMMM.YYYY') AS "recordDate"
//     FROM pathways
//     ${whereClause}
//     ORDER BY "recordDate" DESC
//     LIMIT $${idx} OFFSET $${idx + 1};
// `;

//     values.push(limit, offset);

//     const countQuery = `
//     SELECT COUNT(*) FROM pathways ${whereClause};
// `;

//     const [result, total] = await Promise.all([
//         this.pool.query(dataQuery, values),
//         this.pool.query(countQuery, values.slice(0, idx - 1))
//     ]);

//     const pathways = result.rows;
//     const totalCount = parseInt(total.rows[0].count, 10);

//     return { totalCount, pathways };
// };