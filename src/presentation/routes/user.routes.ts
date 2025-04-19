import { Router } from 'express';
import { UserController } from '../controllers/user.controllers';

let userController: UserController; 

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get current user info
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/me:
 *   put:
 *     summary: Update current user info
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfoDTO'
 *     responses:
 *       200:
 *         description: User info updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/me:
 *   delete:
 *     summary: Delete current user account
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Account deleted and session cleared
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */
const userRoutes = (controller: UserController): Router => {
  userController = controller;
  const router = Router();

  router.get('/me', userController.getUserInfo.bind(userController));
  router.put('/me', userController.updateUserInfo.bind(userController));
  router.delete('/me', userController.deleteAccount.bind(userController));

  return router;
};

export default userRoutes;
