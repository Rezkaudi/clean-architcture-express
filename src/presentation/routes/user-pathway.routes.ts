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
 * /api/user/pathway/protein:
 *   get:
 *     summary: Get all pathways for the authenticated user
 *     tags: [Pathway]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user pathways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pathway'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/pathway/protein/{id}:
 *   get:
 *     summary: Get a single pathway by ID
 *     tags: [Pathway]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pathway to retrieve
 *     responses:
 *       200:
 *         description: Pathway details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pathway'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pathway not found
 */

/**
 * @swagger
 * /api/user/pathway/protein:
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
 * /api/user/pathway/protein/{id}:
 *   put:
 *     summary: Update a pathway by ID
 *     tags: [Pathway]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pathway to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Pathway updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pathway not found
 */

/**
 * @swagger
 * /api/user/pathway/protein/{id}:
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

const userPathwayRoutes = (pathwayController: PathwayController): Router => {
    const router = Router();

    router.get('/', pathwayController.getAllUserPathways.bind(pathwayController));
    router.get('/:id', pathwayController.getPathwayById.bind(pathwayController));
    router.post('/', pathwayController.createPathway.bind(pathwayController));
    router.put('/:id', pathwayController.updatePathway.bind(pathwayController));
    router.delete('/:id', pathwayController.deletePathway.bind(pathwayController));

    return router;
};

export default userPathwayRoutes;