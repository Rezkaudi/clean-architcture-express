import { Router } from 'express';
import { PathwayController } from '../controllers/pathway.controllers';

const publicPathwayRoutes = (pathwayController: PathwayController): Router => {
    const router = Router();

    router.get('/', pathwayController.getAllPathways.bind(pathwayController));
    router.get('/:id', pathwayController.getPathwayById.bind(pathwayController));

    return router;
};

export default publicPathwayRoutes;