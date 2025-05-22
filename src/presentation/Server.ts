import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Express } from "express";
import swaggerUi from 'swagger-ui-express';

import { CONFIG } from "./config/env";
import swaggerSpec from './config/swagger';

import { logger } from './middleware/logger.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

import rootRoute from './routes/root.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import userPathwayRoutes from './routes/user-pathway.routes';
import publicPathwayRoutes from './routes/pubic-pathway.routes';

import { setupDependencies } from './dependencies';
import { corsOptions } from "./config/corsOptions";
import { fetchMeta } from './config/fetchMeta';


export default class Server {
    private app: Express;
    private container: any;

    constructor() {
        this.app = express();
    }

    private setupMiddleware() {
        this.app.use(logger);
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors(corsOptions));
        this.app.use(express.static("public"));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(authMiddleware(this.container.tokenService, this.container.userRepository))
    }

    private setupRoutes() {
        this.app.use("/", rootRoute(this.container.rootController));
        this.app.use('/api/auth', authRoutes(this.container.authController));
        this.app.use('/api/user', userRoutes(this.container.userController));
        this.app.use('/api/user/pathway/protein', userPathwayRoutes(this.container.pathwayController));
        this.app.use('/api/pathway/protein', publicPathwayRoutes(this.container.pathwayController));

        this.app.get('/preview', async (req, res) => {
            const { url } = req.query;

            if (!url) {
                res.status(400).json({ error: "Missing 'url' parameter" });
            }

            try {
                const data = await fetchMeta(url!.toString());
                res.json(data);
            } catch (e) {
                res.status(500).json({ error: e instanceof Error ? e.message : 'Unknown error', url });
            }
        });
    }

    private setupErrorHandlers() {
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }

    public async run(): Promise<void> {
        return new Promise((resolve) => {
            this.app.listen(CONFIG.PORT, () => {
                console.log(`Server is running on ${CONFIG.SERVER_URL}`);
                resolve();
            });
        });
    }

    public init(): void {
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.container = setupDependencies()
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandlers();
    }
}