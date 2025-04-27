import { Router } from 'express';
import { PathwayController } from '../controllers/pathway.controllers';

const userPathwayRoutes = (pathwayController: PathwayController): Router => {
    const router = Router();

    router.get('/', pathwayController.getAllUserPathways.bind(pathwayController));
    router.get('/:id', pathwayController.getPathwayById.bind(pathwayController));
    router.post('/', pathwayController.createPathway.bind(pathwayController));
    router.post('/mock', pathwayController.createMockPathways.bind(pathwayController));
    router.put('/:id', pathwayController.updatePathway.bind(pathwayController));
    router.delete('/:id', pathwayController.deletePathway.bind(pathwayController));

    return router;
};

export default userPathwayRoutes;