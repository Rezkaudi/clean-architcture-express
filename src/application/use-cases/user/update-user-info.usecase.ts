
import { UserInfoDTO } from "../../dtos/user.dto";

import { UserRepository } from "../../../domain/repository/user.repository";

export class UpdateUserInfoUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    execute = async (userId: string, updatedUserData: Partial<UserInfoDTO>): Promise<UserInfoDTO | null> => {
        const user = await this.userRepository.update(userId, updatedUserData);

        const userData: UserInfoDTO = {
            profileImageUrl: user?.profileImageUrl || null,
            firstName: user?.firstName!,
            lastName: user?.lastName!,
            biography: user?.biography || null,
            email: user?.email!,
            phoneNumber: user?.phoneNumber || null,
            degree: user?.degree || null,
            university: user?.university || null,
            links: user?.links || null,
        }

        return userData
    }
}
