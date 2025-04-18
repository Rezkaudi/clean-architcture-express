import { UserRepository } from "../../../domain/repository/user.repository";

export class DeleteUserAccountUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    execute = async (userId: string): Promise<void> => {
        this.userRepository.delete(userId);
    };
}
