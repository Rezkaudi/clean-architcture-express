import { Request, Response } from "express";

import { Messages, StatusCodes } from "../config/constant";

import { CreatePathwayUseCase } from "../../application/use-cases/pathway/create-pathway.usecase";
import { DeletePathwayUseCase } from "../../application/use-cases/pathway/delete-pathway.usecase";

import { ApplicationResponse } from "../../application/response/application-resposne";
import { Pathway } from "../../domain/entity/pathway.entity";

export class PathwayController {
    constructor(
        private readonly createPathwayUseCase: CreatePathwayUseCase,
        private readonly deletePathwayUseCase: DeletePathwayUseCase
    ) { }

    createPathway = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user._id;
            const { title, description, species, category, tissue, relatedDisease, diseaseInput, reactions, recordDate } = req.body;

            const pathwayData: Pathway = {
                userId,
                title,
                description,
                species,
                category,
                tissue,
                relatedDisease,
                diseaseInput,
                reactions,
                recordDate
            };

            const createdPathway = await this.createPathwayUseCase.execute(pathwayData);

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.CREATED,
                success: true,
                data: { pathway: createdPathway },
                message: Messages.CREATE_PATHWAY_SUCCESS
            }).send();
        } catch (error) {
            throw error
        }
    };

    deletePathway = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            await this.deletePathwayUseCase.execute(id);

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                data: {},
                message: Messages.DELETE_PATHWAY_SUCCESS
            }).send();
        } catch (error) {
            throw error
        }
    };
}
