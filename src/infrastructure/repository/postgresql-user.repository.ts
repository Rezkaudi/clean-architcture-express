import Database from "../database/postgreSQL";

import { User } from "../../domain/entity/user.entity"
import { UserRepository } from "../../domain/repository/user.repository"


export class PostgreSQLUserRepository implements UserRepository {
    private pool = Database.getInstance().getPool();

    create = async (user: User): Promise<User> => {
        const query = `
            INSERT INTO users (_id, email, password, "firstName", "lastName","profileImageUrl","isVerified","verificationToken","verificationTokenExpiresAt")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
        const values = [user._id, user.email, user.password, user.firstName, user.lastName, user.profileImageUrl, user.isVerified, user.verificationToken, user.verificationTokenExpiresAt];

        const result = await this.pool.query(query, values);
        return result.rows[0];
    };

    findById = async (id: string): Promise<User | null> => {
        const query = `SELECT * FROM users WHERE _id = $1 LIMIT 1;`;
        const result = await this.pool.query(query, [id]);

        return result.rows[0] || null;
    };

    findByEmail = async (email: string): Promise<User | null> => {
        const query = `SELECT * FROM users WHERE email = $1 LIMIT 1;`;
        const result = await this.pool.query(query, [email]);

        return result.rows[0] || null;
    };

    findByVerificationToken = async (verificationToken: string): Promise<User | null> => {
        const query = `SELECT * FROM users WHERE "verificationToken" = $1 LIMIT 1;`;
        const result = await this.pool.query(query, [verificationToken]);

        return result.rows[0] || null;
    };

    update = async (userId: string, userData: Partial<User>): Promise<User | null> => {
        const fields = Object.keys(userData);
        const values = Object.values(userData);

        if (fields.length === 0) return null;

        const setClause = fields.map((field, index) => `"${field}" = $${index + 2}`).join(", ");
        const query = `UPDATE users SET ${setClause} WHERE _id = $1;`;
        const result = await this.pool.query(query, [userId, ...values]);

        return result.rows[0] || null;
    };

    delete = async (id: string): Promise<void> => {
        const query = `DELETE FROM users WHERE _id = $1;`;
        await this.pool.query(query, [id]);
    };
}