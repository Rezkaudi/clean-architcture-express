import { Pool, PoolClient } from "pg"
import { CONFIG } from "../../../presentation/config/env";


export default class Database {
    private static instance: Database;
    private pool: Pool | null = null;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private createPool(): void {
        this.pool = new Pool({
            user: CONFIG.POSTGRES_USER,
            host: CONFIG.POSTGRES_HOST,
            database: CONFIG.POSTGRES_DATABASE,
            password: CONFIG.POSTGRES_PASSWORD,
            port: CONFIG.POSTGRES_PORT as number,
            ssl: { rejectUnauthorized: false },
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
            keepAlive: true,
        });

        this.pool.on("error", (err: Error) => {
            console.error("Unexpected PostgreSQL client error", err);
            this.pool = null; // Reset the pool to trigger reconnect
        });
    }

    public async connect(): Promise<void> {
        if (this.pool) {
            console.log("PostgreSQL already connected.");
            return;
        }

        console.log(`New connection to PostgreSQL`);
        try {

            this.createPool();

            const client: PoolClient = await this.pool!.connect();
            client.release(); // Important: Always release the client!

            console.log("Connected to PostgreSQL");

        } catch (error) {
            console.error("Error connecting to PostgreSQL:", error);
            this.pool = null;
            process.exit(1);
        }
    }

    public getPool(): Pool {
        if (!this.pool) throw new Error("Database not connected");
        return this.pool;
    }
}

