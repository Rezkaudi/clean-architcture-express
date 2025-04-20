
import { Request, Response } from "express"

import { CONFIG } from "../config/env";
import { Messages, StatusCodes } from "../config/constant";

import {
    GetUserInfoUseCase,
    UpdateUserInfoUseCase,
    DeleteUserAccountUseCase,
} from "../../application/use-cases/user";


import { ApplicationResponse } from "../../application/response/application-resposne";
import { UserInfoDTO } from "../../application/dtos/user.dto";


export class UserController {
    constructor(
        private readonly getUserInfoUseCase: GetUserInfoUseCase,
        private readonly updateUserInfoUseCase: UpdateUserInfoUseCase,
        private readonly deleteUserAccountUseCase: DeleteUserAccountUseCase,
    ) { }

    getUserInfo = async (req: Request, res: Response): Promise<void> => {
        try {

            const userId = req.user._id
            const userInfo = await this.getUserInfoUseCase.execute(userId)

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                data: { user: userInfo },
                message: Messages.GET_USER_INFO_SUCCESS
            }).send()

        } catch (error) {
            throw error
        }
    };

    updateUserInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user._id
            const { profileImageUrl, firstName, lastName, biography, email, phoneNumber, degree, university, links } = req.body;
            const jsonLinks = JSON.stringify(links)

            const updatedUserData: Partial<UserInfoDTO> = {
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(biography !== undefined && { biography }),
                ...(email && { email }),
                ...(phoneNumber !== undefined && { phoneNumber }),
                ...(degree !== undefined && { degree }),
                ...(university !== undefined && { university }),
                ...(profileImageUrl !== undefined && { profileImageUrl }),
                ...(links !== undefined && { links: jsonLinks }),
            };

            const updatedUserInfo = await this.updateUserInfoUseCase.execute(userId, updatedUserData)

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                data: { user: updatedUserInfo },
                message: Messages.UPDATE_USER_INFO_SUCCESS
            }).send()

        } catch (error) {
            throw error
        }
    };

    deleteAccount = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user._id
            await this.deleteUserAccountUseCase.execute(userId)

            const cookieOptions = {
                httpOnly: true,
                secure: CONFIG.NODE_ENV === "production",
                sameSite: "none" as const
            }

            res.clearCookie(CONFIG.ACCESS_TOKEN_COOKIE.name, cookieOptions);
            res.clearCookie(CONFIG.REFRESH_TOKEN_COOKIE.name, cookieOptions);

            req.user = null

            return new ApplicationResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                data: {},
                message: Messages.DELETE_USER_ACCOUNT_SUCCESS
            }).send()

        } catch (error) {
            throw error
        }
    };

}




