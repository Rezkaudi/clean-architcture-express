import { Router } from 'express';
import { PathwayController } from '../controllers/pathway.controllers';

/**
 * @swagger
 * tags:
 *   name: Pathway
 *   description: Pathway management endpoints
 */

/**
 * @swagger
 * /api/pathway:
 *   post:
 *     summary: Create a new pathway
 *     tags: [Pathway]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - species
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               species:
 *                 type: string
 *               category:
 *                 type: string
 *               tissue:
 *                 type: object
 *                 description: JSON object for tissue data
 *               relatedDisease:
 *                 type: string
 *               diseaseInput:
 *                 type: object
 *                 description: JSON object for disease input
 *               reactions:
 *                 type: array
 *                 items:
 *                   type: object
 *                 description: Array of reaction objects
 *               recordDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Pathway created successfully
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
 * /api/pathway/{id}:
 *   delete:
 *     summary: Delete a pathway by ID
 *     tags: [Pathway]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pathway to delete
 *     responses:
 *       200:
 *         description: Pathway deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pathway not found
 */

const pathwayRoutes = (pathwayController: PathwayController): Router => {
  const router = Router();

  router.post('/', pathwayController.createPathway.bind(pathwayController));
  router.delete('/:id', pathwayController.deletePathway.bind(pathwayController));

  return router;
};

export default pathwayRoutes;
