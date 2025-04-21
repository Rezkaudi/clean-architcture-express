
import { ResetPasswordDTO } from "../../dtos/user.dto";

import { BadRequestError } from "../../errors/application-error";

import { UserRepository } from "../../../domain/repository/user.repository"
import { EncryptionService } from "../../../domain/services/encryption.service";


export class ResetPasswordUseCase {

    constructor(
        private encryptionService: EncryptionService,
        private readonly userRepository: UserRepository,
    ) { }

    execute = async (resetPasswordData: ResetPasswordDTO): Promise<void> => {
        console.log(resetPasswordData.resetPasswordToken)
        const user = await this.userRepository.findByResetPasswordToken(resetPasswordData.resetPasswordToken);

        if (!user) {
            throw new BadRequestError("Invalid or expired resetPasswordToken");
        }

        const hashedNewPassword = await this.encryptionService.hash(resetPasswordData.newPassword);

        await this.userRepository.update(user._id!, {
            password: hashedNewPassword,
            resetPasswordToken: null,
            resetPasswordTokenExpiresAt: null
        });
    }
}
