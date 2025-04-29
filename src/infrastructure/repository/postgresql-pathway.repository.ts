import Database from "../database/postgreSQL";

import { Pathway } from "../../domain/entity/pathway.entity";
import { PathwayRepository } from "../../domain/repository/pathway.repository";
import { FilterPathwayDTO, PathwayWithPaginationDTO } from "../../application/dtos/pathway.dto";


export class PostgreSQLPathwayRepository implements PathwayRepository {
    private pool = Database.getInstance().getPool();

    getAll = async (limit: number, offset: number, filters: FilterPathwayDTO): Promise<PathwayWithPaginationDTO> => {

        const { search, category, year, orderBy, orderDirection } = filters;

        const conditions: string[] = [];
        const filterParams: any[] = [];
        let paramIndex = 1; // Start at 1 for count query

        if (search) {
            conditions.push(`(
            title ILIKE $${paramIndex} OR 
            description ILIKE $${paramIndex} OR 
            species ILIKE $${paramIndex} OR 
            category ILIKE $${paramIndex} OR 
            "relatedDisease" ILIKE $${paramIndex}
          )`);
            filterParams.push(`%${search}%`);
            paramIndex++;
        }

        if (category) {
            conditions.push(`category = $${paramIndex}`);
            filterParams.push(category);
            paramIndex++;
        }

        if (year) {
            conditions.push(`RIGHT("recordDate", 4) = $${paramIndex}`);
            filterParams.push(year);
            paramIndex++;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const orderByClause = orderBy === 'recordDate'
            ? `CASE
              WHEN "recordDate" ~ '^\\d{4}-\\d{2}-\\d{2}$' THEN TO_DATE("recordDate", 'YYYY-MM-DD')
              WHEN "recordDate" ~ '^\\d{1,2}\\.\\d{1,2}\\.\\d{4}$' THEN TO_DATE("recordDate", 'DD.MM.YYYY')
              ELSE NULL
          END`
            : `"${orderBy}"`;

        const dataQuery = `
        SELECT 
          _id,
          title,
          species,
          category,
          "recordDate"
        FROM pathways
        ${whereClause}
        ORDER BY ${orderByClause} ${orderDirection}
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1};
      `;


        const countQuery = `
          SELECT COUNT(*) FROM pathways
          ${whereClause};
        `;

        // Data query params: [filters..., limit, offset]
        const dataParams = [...filterParams, limit, offset];

        const [result, total] = await Promise.all([
            this.pool.query(dataQuery, dataParams),
            this.pool.query(countQuery, filterParams) // Only filters, no limit/offset
        ]);

        const pathways = result.rows;
        const totalCount = parseInt(total.rows[0].count, 10);

        return { totalCount, pathways };
    };

    delete = async (id: string): Promise<void> => {
        const query = `DELETE FROM pathways WHERE _id = $1;`;
        await this.pool.query(query, [id]);
    };

    create = async (pathway: Pathway): Promise<Pathway> => {
        const query = `
            INSERT INTO pathways (_id, "userId",title,description,species,category,tissue,"relatedDisease","diseaseInput",reactions,"recordDate","pubMeds") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
            pathway.recordDate,
            pathway.pubMeds
        ];

        const result = await this.pool.query(query, values);
        return result.rows[0];
    };

    findById = async (id: string): Promise<Pathway | null> => {
        const query = `SELECT * FROM pathways WHERE _id = $1 LIMIT 1;`;
        const result = await this.pool.query(query, [id]);

        return result.rows[0] || null;
    };

    findByUserId = async (userId: string, limit: number, offset: number, filters: FilterPathwayDTO): Promise<PathwayWithPaginationDTO> => {
        const { search, category, year, orderBy, orderDirection } = filters;

        const conditions: string[] = [`"userId" = $1`];
        const params: any[] = [userId];
        let paramIndex = 2; // because $1 is userId

        if (search) {
            conditions.push(`(
                title ILIKE $${paramIndex} OR 
                species ILIKE $${paramIndex} OR 
                category ILIKE $${paramIndex}
            )`);
            params.push(`%${search}%`);
            paramIndex++;
        }

        if (category) {
            conditions.push(`category = $${paramIndex}`);
            params.push(category);
            paramIndex++;
        }

        if (year) {
            conditions.push(`RIGHT("recordDate", 4) = $${paramIndex}`);
            params.push(year);
            paramIndex++;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const orderByClause = orderBy === 'recordDate'
            ? `CASE
                WHEN "recordDate" ~ '^\\d{4}-\\d{2}-\\d{2}$' THEN TO_DATE("recordDate", 'YYYY-MM-DD')
                WHEN "recordDate" ~ '^\\d{1,2}\\.\\d{1,2}\\.\\d{4}$' THEN TO_DATE("recordDate", 'DD.MM.YYYY')
                ELSE NULL
              END`
            : `"${orderBy}"`;

        // ⚡ Corrected here: use LIMIT/OFFSET separately in dataQuery
        const dataQuery = `
            SELECT 
                _id,
                title,
                species,
                category,
                "recordDate"
            FROM pathways
            ${whereClause}
            ORDER BY ${orderByClause} ${orderDirection}
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1};
        `;

        const dataParams = [...params, limit, offset]; // filters + limit/offset

        const countQuery = `
            SELECT COUNT(*) FROM pathways
            ${whereClause};
        `;

        const [result, total] = await Promise.all([
            this.pool.query(dataQuery, dataParams),
            this.pool.query(countQuery, params) // only filters
        ]);

        const pathways = result.rows;
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

