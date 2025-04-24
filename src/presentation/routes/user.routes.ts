import { Router } from 'express';
import { UserController } from '../controllers/user.controllers';

const userRoutes = (userController: UserController): Router => {
  const router = Router();

  router.get('/me', userController.getUserInfo.bind(userController));
  router.put('/me', userController.updateUserInfo.bind(userController));
  router.delete('/me', userController.deleteAccount.bind(userController));

  return router;
};

export default userRoutes;
