import { CONFIG } from "./config/env";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Express } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

import { logger } from './middleware/logger.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

import rootRoute from './routes/root.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

import { setupDependencies } from './dependencies';

export default class Server {
    private app: Express;
    private container: any;

    constructor() {
        this.app = express();
    }

    private setupMiddleware() {
        this.app.use(cors());
        this.app.use(logger);
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.static("public"));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(authMiddleware(this.container.tokenService, this.container.userRepository))
    }

    private setupRoutes() {
        this.app.use("/", rootRoute(this.container.rootController));
        this.app.use('/api/auth', authRoutes(this.container.authController));
        this.app.use('/api/user', userRoutes(this.container.userController));
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
        this.container = setupDependencies();
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandlers();
    }
}