
import { RegisterDTO } from "../../dtos/user.dto";

import { BadRequestError, ConflictRequestError } from "../../errors/application-error";

import { MailService } from "../../../domain/services/mail.service";
import { UserRepository } from "../../../domain/repository/user.repository"
import { EncryptionService } from "../../../domain/services/encryption.service";
import { RandomStringGenerator } from "../../../domain/services/random-str-generator.service";
import { UuidGeneratorService } from "../../../infrastructure/srevices/uuid-generator.service";


export class RegisterUseCase {
    private verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    constructor(
        private readonly ServerUrl: string,
        private readonly emailService: MailService,
        private readonly userRepository: UserRepository,
        private readonly encryptionService: EncryptionService,
        private readonly uuidGeneratorService: UuidGeneratorService,
        private readonly randomStringGenerator: RandomStringGenerator,

    ) { }

    execute = async (registerData: RegisterDTO): Promise<string> => {

        const existingUser = await this.userRepository.findByEmail(registerData.email);

        if (existingUser) {
            if (!existingUser.isVerified) {
                throw new BadRequestError("Please Verify Your Email");
            }
            else {
                throw new ConflictRequestError("User already exists");
            }
        }

        const hashedPassword = await this.encryptionService.hash(registerData.password);
        const verificationToken = this.randomStringGenerator.generate(32);

        const user = {
            _id: this.uuidGeneratorService.generate(),
            email: registerData.email,
            password: hashedPassword,
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            profileImageUrl: undefined,
            isVerified: false,
            verificationToken,
            verificationTokenExpiresAt: this.verificationTokenExpiresAt,
        }

        await this.userRepository.create(user);

        // send verification email

        const verifyUrl = `${this.ServerUrl}/api/auth/verify-email?verificationToken=${verificationToken}`
        const subject = "verify your email"
        const template = `
        <h4>verify your email</h4>
        <a href="${verifyUrl}">verify</a>
        `
        await this.emailService.send(registerData.email, subject, template)

        // temporary
        return verificationToken

    };
}
