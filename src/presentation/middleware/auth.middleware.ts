import { CONFIG } from "../config/env";

import { Request, Response, NextFunction } from 'express';
import { TokenService } from "../../domain/services/token.service";
import { UserRepository } from "../../domain/repository/user.repository";
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../../application/errors/application-error";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// Define a regex pattern for paths that should be excluded
const excludedPaths = [
    "/api/auth/refresh-token",
    "/api/auth/register",
    "/api/auth/login",
    "/api/auth/verify-email",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
    "/api/auth/resend-verification",
];

export const authMiddleware = (tokenService: TokenService, userRepository: UserRepository) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        // Check if the current path matches any excluded path
        const isExcluded = excludedPaths.some(path => req.path === path);

        if (isExcluded) {
            return next();
        }

        const accessToken = req.cookies[CONFIG.ACCESS_TOKEN_COOKIE.name];
        const refreshToken = req.cookies[CONFIG.REFRESH_TOKEN_COOKIE.name];

        if (!refreshToken) {
            throw new ForbiddenError()
        }

        if (!accessToken) {
            throw new UnauthorizedError()
        }

        try {
            const { userId } = await tokenService.verify(accessToken, CONFIG.JWT_SECRET_ACCESS_TOKEN.token) as { userId: string }

            const user = await userRepository.findById(userId);

            if (user) {
                req.user = user
                next();
            } else {
                throw new BadRequestError("User Not Found")
            }

        } catch (error) {
            throw new UnauthorizedError((error as any).message)
        }
    };
};
