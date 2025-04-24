import { Router } from 'express';
import { AuthController } from "../controllers/auth.controllers";
import {
    loginValidator,
    registerValidator,
    verifyEmailValidator,
    resetPasswordValidator,
    forgotPasswordValidator,
    updatePasswordValidator,
    resendVerifyEmailValidator,
} from "../validators/auth.validators";

const authRoutes = (authController: AuthController): Router => {
    const router = Router();

    router.post("/logout", authController.logout.bind(authController));
    router.get("/check-auth", authController.checkAuth.bind(authController));
    router.post("/login", loginValidator, authController.login.bind(authController));
    router.post("/refresh-token", authController.refreshAccessToken.bind(authController));
    router.post("/register", registerValidator, authController.register.bind(authController));
    router.get("/verify-email", verifyEmailValidator, authController.verifyEmail.bind(authController));
    router.post("/reset-password", resetPasswordValidator, authController.resetPassword.bind(authController));
    router.post("/forgot-password", forgotPasswordValidator, authController.forgotPassword.bind(authController));
    router.patch("/update-password", updatePasswordValidator, authController.updatePassword.bind(authController));
    router.post("/resend-verification", resendVerifyEmailValidator, authController.resendVerification.bind(authController));

    return router;
};

export default authRoutes;
