import { Router } from 'express';
import { PathwayController } from '../controllers/pathway.controllers';

/**
 * @swagger
 * tags:
 *   name: PublicPathway
 *   description: Public access to protein pathway data
 */

/**
 * @swagger
 * /api/pathway/protein:
 *   get:
 *     summary: Get all public protein pathways
 *     tags: [PublicPathway]
 *     responses:
 *       200:
 *         description: List of all public protein pathways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pathway'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/pathway/protein/{id}:
 *   get:
 *     summary: Get a public protein pathway by ID
 *     tags: [PublicPathway]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the public pathway to retrieve
 *     responses:
 *       200:
 *         description: Public protein pathway details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pathway'
 *       404:
 *         description: Pathway not found
 *       500:
 *         description: Internal server error
 */

const publicPathwayRoutes = (pathwayController: PathwayController): Router => {
    const router = Router();

    router.get('/', pathwayController.getAllPathways.bind(pathwayController));
    router.get('/:id', pathwayController.getPathwayById.bind(pathwayController));

    return router;
};

export default publicPathwayRoutes;