import { Pool } from "pg"
import { CONFIG } from "../../../presentation/config/env";


export default class Database {
    private static instance: Database;
    private isConnected: boolean = false;
    private pool: Pool | null = null;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        if (this.isConnected) {
            console.log("PostgreSQL already connected.");
            return;
        }

        console.log(`New connection to PostgreSQL`);
        try {

            this.pool = new Pool({
                user: CONFIG.POSTGRES_USER,
                host: CONFIG.POSTGRES_HOST,
                database: CONFIG.POSTGRES_DATABASE,
                password: CONFIG.POSTGRES_PASSWORD,
                port: CONFIG.POSTGRES_PORT as number,
                ssl: true
            })

            // or
            // this.pool = new Pool({
            //     connectionString: CONFIG.DEV_POSTGRESQL_URI,
            // });

            await this.pool.connect();
            this.isConnected = true;

            console.log("Connected to PostgreSQL");

        } catch (error) {
            if (error instanceof Error) {
                console.log("Error connecting to PostgreSQL:", error.message);
            } else {
                console.log("Unexpected error:", error);
            }
            process.exit(1);
        }
    }

    public getPool(): Pool {
        if (!this.pool) throw new Error("Database not connected");
        return this.pool;
    }
}

