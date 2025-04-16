
import { UserInfoDTO } from "../../dtos/user.dto";

import { UserRepository } from "../../../domain/repository/user.repository";
import { User } from "../../../domain/entity/user.entity";

export class UpdateUserInfoUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    execute = async (userId: string, updatedUserData: Partial<UserInfoDTO>): Promise<User | null> => {
        const user = await this.userRepository.update(userId, updatedUserData);
        return user
    }
}
