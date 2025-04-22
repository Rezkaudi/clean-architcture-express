import { allowedOrigins, CONFIG } from "./config/env";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Express } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

// console.log(JSON.stringify(swaggerSpec, null, 2));

import { logger } from './middleware/logger.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

import rootRoute from './routes/root.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import pathwayRoutes from './routes/pathway.routes';


import { setupDependencies } from './dependencies';

export default class Server {
    private app: Express;
    private container: any;

    constructor() {
        this.app = express();
    }

    private setupMiddleware() {
        this.app.use(cors({
            origin: function (origin, callback) {
                // allow requests with no origin (like mobile apps or curl requests)
                if (!origin) return callback(null, true);
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                } else {
                    return callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }));
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
        this.app.use('/api/pathway', pathwayRoutes(this.container.pathwayController));
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