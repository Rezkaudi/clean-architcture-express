
import { Router } from 'express';

import { AuthController } from "../controllers/auth.controllers"

import {
    loginValidator,
    registerValidator,
    verifyEmailValidator,
    resetPasswordValidator,
    forgotPasswordValidator,
} from "../validators/auth.validators"

const authRoutes = (authController: AuthController): Router => {
    const router = Router()

    router.post("/logout", authController.logout.bind(authController))
    router.get("/check-auth", authController.checkAuth.bind(authController))
    router.post("/login", loginValidator, authController.login.bind(authController));
    router.post("/register", registerValidator, authController.register.bind(authController));
    router.get("/verify-email", verifyEmailValidator, authController.verifyEmail.bind(authController))
    router.post("/refresh-token", authController.refreshAccessToken.bind(authController))
    router.post("/reset-password", resetPasswordValidator, authController.resetPassword.bind(authController))
    router.post("/forgot-password", forgotPasswordValidator, authController.forgotPassword.bind(authController))

    return router;
};

export default authRoutes