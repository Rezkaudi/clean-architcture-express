export interface PublicPathwayDTO {
    _id: string,
    title: string | null;
    description: string | null;
    species: string | null;
    category: string | null;
    tissue: {
        id: string,
        parent: string,
        text: string
    } | null,
    relatedDisease: string | null,
    diseaseInput: {
        Disease_id: string,
        Disease_name: string
    } | null,
    reactions: any | null,
    recordDate: string | null,
}


/**
 * @swagger
 * components:
 *   schemas:
 *     Pathway:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *         species:
 *           type: string
 *           nullable: true
 *         category:
 *           type: string
 *           nullable: true
 *         tissue:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *             parent:
 *               type: string
 *             text:
 *               type: string
 *         relatedDisease:
 *           type: string
 *           nullable: true
 *         diseaseInput:
 *           type: object
 *           nullable: true
 *           properties:
 *             Disease_id:
 *               type: string
 *             Disease_name:
 *               type: string
 *         reactions:
 *           type: array
 *           nullable: true
 *           items:
 *             type: object
 *         recordDate:
 *           type: string
 *           nullable: true
 *           format: date
 */
