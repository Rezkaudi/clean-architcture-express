import { UserInfoDTO } from "../../dtos/user.dto";
import { BadRequestError } from "../../errors/application-error";

import { UserRepository } from "../../../domain/repository/user.repository";


export class GetUserInfoUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    execute = async (userId: string): Promise<UserInfoDTO> => {

        const user = await this.userRepository.findById(userId);
        // .lean()

        if (!user) {
            throw new BadRequestError("User not found");
        }

        const userInfo: UserInfoDTO = {
            profileImageUrl: user.profileImageUrl ?? null,
            firstName: user.firstName,
            lastName: user.lastName,
            biography: user.biography ?? null,
            email: user.email,
            phoneNumber: user.phoneNumber ?? null,
            degree: user.degree ?? null,
            university: user.university ?? null,
            links: user.links ?? null
        }

        return userInfo
    };
}
