import { UpdatePasswordDTO } from "../../dtos/user.dto";

import { BadRequestError } from "../../errors/application-error";

import { UserRepository } from "../../../domain/repository/user.repository";
import { EncryptionService } from "../../../domain/services/encryption.service";

export class UpdatePasswordUseCase {
    constructor(
        private encryptionService: EncryptionService,
        private readonly userRepository: UserRepository,
    ) { }

    execute = async (updatePasswordData: UpdatePasswordDTO): Promise<void> => {
        const user = await this.userRepository.findById(updatePasswordData.userId);
        if (!user) {
            throw new BadRequestError("User not found");
        }

        const isPasswordValid = await this.encryptionService.compare(
            updatePasswordData.currentPassword,
            user.password
        );

        if (!isPasswordValid) {
            throw new BadRequestError("Current password is incorrect");
        }

        const hashedNewPassword = await this.encryptionService.hash(updatePasswordData.newPassword);

        await this.userRepository.update(user._id!, {
            password: hashedNewPassword
        });
    }
}