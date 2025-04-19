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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDTO'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - User already exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *         headers:
 *           Set-Cookie:
 *             description: HttpOnly cookie containing the access token
 *             schema:
 *               type: string
 *               example: accessToken=abc123; HttpOnly; Secure
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: verificationToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid or expired verification token
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/check-auth:
 *   get:
 *     summary: Check authentication status
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *         headers:
 *           Set-Cookie:
 *             description: HttpOnly cookie containing the new access token
 *             schema:
 *               type: string
 *               example: accessToken=def456; HttpOnly; Secure
 *       401:
 *         description: Invalid or missing refresh token
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password using reset token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordDTO'
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid or expired reset token
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send a password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordDTO'
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auth/update-password:
 *   patch:
 *     summary: Update password for authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePasswordDTO'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/resend-verification:
 *   post:
 *     summary: Resend email verification token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendVerifyEmailDTO'
 *     responses:
 *       200:
 *         description: Verification email resent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request
 */

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
