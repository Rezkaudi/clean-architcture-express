
import { MailService } from "../../../domain/services/mail.service";
import { UserRepository } from "../../../domain/repository/user.repository"
import { RandomStringGenerator } from "../../../domain/services/random-str-generator.service";
import { BadRequestError } from "../../errors/application-error";

export class ForgotPasswordUseCase {

    constructor(
        private readonly frontEndUrl: string,
        private readonly emailService: MailService,
        private readonly userRepository: UserRepository,
        private readonly randomStringGenerator: RandomStringGenerator,
    ) { }

    execute = async (email: string): Promise<void> => {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new BadRequestError("User not found");
        }

        const resetPasswordTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now
        const resetPasswordToken = this.randomStringGenerator.generate(32);

        await this.userRepository.update(user._id!, {
            resetPasswordToken,
            resetPasswordTokenExpiresAt
        });

        // send email
        const resetPasswordUrl = `${this.frontEndUrl}/reset-password?resetPasswordToken=${resetPasswordToken}`
        const subject = "Reset Password Verification"
        const template = `
        <h4>Please Reset Password</h4>
        <p>Click the link below to Reset Password:</p>
        <a href="${resetPasswordUrl}">Reset Password</a>
        <p>If the button doesn't work, use the token below:</p>
        <code>${resetPasswordToken}</code>
    `;

        await this.emailService.send(email, subject, template)
    }
}
