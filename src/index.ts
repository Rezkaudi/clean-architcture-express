
import Server from "./presentation/Server";
import Database from "./infrastructure/database/mongoDB";

async function main() {
    try {
        const server = new Server();
        const db = Database.getInstance();

        await db.connect();

        server.init();
        await server.run();

    } catch (error) {
        console.error("Failed to start the application:", error);
        process.exit(1);
    }
}

main();
