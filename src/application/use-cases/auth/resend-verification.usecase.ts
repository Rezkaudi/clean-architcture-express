

import { BadRequestError } from "../../errors/application-error";

import { MailService } from "../../../domain/services/mail.service";
import { UserRepository } from "../../../domain/repository/user.repository"
import { RandomStringGenerator } from "../../../domain/services/random-str-generator.service";


export class ResendVerificationUseCase {
    private verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    constructor(
        private readonly ServerUrl: string,
        private readonly emailService: MailService,
        private readonly userRepository: UserRepository,
        private readonly randomStringGenerator: RandomStringGenerator,

    ) { }

    execute = async (email: string): Promise<string> => {

        const existingUser = await this.userRepository.findByEmail(email);

        if (!existingUser) {
            throw new BadRequestError("User Not Found");
        }

        const verificationToken = this.randomStringGenerator.generate(32);

        const updatedUser = {
            verificationToken,
            verificationTokenExpiresAt: this.verificationTokenExpiresAt,
        }

        await this.userRepository.update(existingUser._id!, updatedUser);

        // send verification email

        const verifyUrl = `${this.ServerUrl}/api/auth/verify-email?verificationToken=${verificationToken}`
        const subject = "verify your email"
        const template = `
        <h4>verify your email</h4>
        <a href="${verifyUrl}">verify</a>
        `
        await this.emailService.send(email, subject, template)

        // temporary
        return verificationToken

    };
}
