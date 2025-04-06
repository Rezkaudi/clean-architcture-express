import mongoose from "mongoose";
import { CONFIG } from "../../../presentation/config/env";

const MONGODB_URI = CONFIG.DEV_MONGODB_URI;

export default class Database {
    private static instance: Database;
    private isConnected: boolean = false;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        if (this.isConnected) {
            console.log("MongoDB already connected.");
            return;
        }

        console.log(`New connection to MongoDB`);
        try {
            console.log("mongo_uri: ", MONGODB_URI);
            const conn = await mongoose.connect(MONGODB_URI!);
            this.isConnected = true;
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error connecting to MongoDB:", error.message);
            } else {
                console.log("Unexpected error:", error);
            }
            process.exit(1);
        }
    }
}

