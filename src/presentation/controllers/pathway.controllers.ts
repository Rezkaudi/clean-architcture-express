import { Request, Response } from "express";

import { Messages, StatusCodes } from "../config/constant";

import {
    CreatePathwayUseCase,
    DeletePathwayUseCase,
    UpdatePathwayUseCase,
    GetAllPathwaysUseCase,
    GetPathwayByIdUseCase,
    GetAllUserPathwaysUseCase,
} from "../../application/use-cases/pathway";

import { ApplicationResponse } from "../../application/response/application-resposne";

export class PathwayController {
    constructor(
        private readonly createPathwayUseCase: CreatePathwayUseCase,
        private readonly deletePathwayUseCase: DeletePathwayUseCase,
        private readonly updatePathwayUseCase: UpdatePathwayUseCase,
        private readonly getAllPathwaysUseCase: GetAllPathwaysUseCase,
        private readonly getPathwayByIdUseCase: GetPathwayByIdUseCase,
        private readonly getAllUserPathwaysUseCase: GetAllUserPathwaysUseCase,
    ) { }

    createPathway = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user._id;
            const { title, description, species, category, tissue, relatedDisease, diseaseInput, reactions, recordDate } = req.body;

            const pathwayData = {
                userId,
                title,
                description,
                species,
                category,
                recordDate,
                relatedDisease,
                tissue: JSON.stringify(tissue) as any,
                reactions: JSON.stringify(reactions) as any,
                diseaseInput: JSON.stringify(diseaseInput) as any,
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

    getAllPathways = async (req: Request, res: Response): Promise<void> => {
        try {
            const pageNumber = parseInt(req.query.pageNumber as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;

            const offset = (pageNumber - 1) * pageSize;

            const { pathways, totalCount } = await this.getAllPathwaysUseCase.execute(pageSize, offset);

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                data: {
                    pageNumber,
                    pageSize,
                    totalCount,
                    pathways
                },
                message: Messages.GET_PATHWAYS_SUCCESS
            }).send();
        } catch (error) {
            throw error
        }
    };

    getPathwayById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const pathway = await this.getPathwayByIdUseCase.execute(id);

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                data: { pathway },
                message: Messages.GET_PATHWAY_SUCCESS
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

    getAllUserPathways = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user._id;
            const pageNumber = parseInt(req.query.pageNumber as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;

            const offset = (pageNumber - 1) * pageSize;

            const { pathways, totalCount } = await this.getAllUserPathwaysUseCase.execute(userId, pageSize, offset);

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                data: {
                    pageNumber,
                    pageSize,
                    totalCount,
                    pathways
                },
                message: Messages.GET_PATHWAY_SUCCESS
            }).send();

        } catch (error) {
            throw error
        }
    };

    updatePathway = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const userId = req.user._id;
            const { title, description, species, category, tissue, relatedDisease, diseaseInput, reactions, recordDate } = req.body;

            const pathwayData = {
                ...(title !== undefined && { title }),
                ...(category !== undefined && { category }),
                ...(description !== undefined && { description }),
                ...(species !== undefined && { species }),
                ...(recordDate !== undefined && { recordDate }),
                ...(relatedDisease !== undefined && { relatedDisease }),
                ...(tissue !== undefined && { tissue: JSON.stringify(tissue) as any }),
                ...(reactions !== undefined && { reactions: JSON.stringify(reactions) as any }),
                ...(diseaseInput !== undefined && { diseaseInput: JSON.stringify(diseaseInput) as any }),
            };

            const pathway = await this.updatePathwayUseCase.execute(id, userId, pathwayData);

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                data: { pathway },
                message: Messages.UPDATE_PATHWAY_SUCCESS
            }).send();
        } catch (error) {
            throw error
        }
    };
}