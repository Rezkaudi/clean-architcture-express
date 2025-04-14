import { CONFIG } from '../config/env';

// Srevices
import { JwtTokenService } from '../../infrastructure/srevices/jwt-token.service';
import { BcryptPasswordHasher } from '../../infrastructure/srevices/bcrypt-password-hasher';
import { NodemailerGmailService } from '../../infrastructure/srevices/nodemailer-gmail.service';
import { CryptoRandomStringGenerator } from '../../infrastructure/srevices/crypto-random-string-generator';

// Repositories
import { MongoUserRepository } from '../../infrastructure/repository/mongo-user.repository';

// Use Cases
import {
    LoginUseCase,
    RegisterUseCase,
    VerifyEmailUseCase,
    ResetPasswordUseCase,
    ForgotPasswordUseCase,
    RefreshAccessTokenUseCase,
    UpdatePasswordUseCase,
} from '../../application/use-cases/auth';


// Controllers
import { AuthController } from '../controllers/auth.controllers';
import { RootController } from '../controllers/root.controllers';


export const setupDependencies = () => {

    const frontEndUrl = CONFIG.FRONT_URL
    const serverUrl = CONFIG.SERVER_URL

    const secretAccessToken = CONFIG.JWT_SECRET_ACCESS_TOKEN
    const secretRefreshToken = CONFIG.JWT_SECRET_REFRESH_TOKEN

    // Repositories
    const tokenService = new JwtTokenService()
    const userRepository = new MongoUserRepository();
    const randomStringGenerator = new CryptoRandomStringGenerator()
    const encryptionService = new BcryptPasswordHasher(CONFIG.SALT_ROUNDS_BCRYPT)
    const emailService = new NodemailerGmailService(CONFIG.GMAIL_USER!, CONFIG.GMAIL_PASS!)

    // Use Cases
    const loginUseCase = new LoginUseCase(
        secretAccessToken,
        secretRefreshToken,
        tokenService,
        userRepository,
        encryptionService
    );

    const registerUseCase = new RegisterUseCase(
        serverUrl,
        emailService,
        userRepository,
        encryptionService,
        randomStringGenerator
    );

    const verifyEmailUseCase = new VerifyEmailUseCase(
        tokenService,
        userRepository,
        secretAccessToken,
        secretRefreshToken
    );

    const resetPasswordUseCase = new ResetPasswordUseCase(
        encryptionService,
        userRepository
    );


    const forgotPasswordUseCase = new ForgotPasswordUseCase(
        frontEndUrl,
        emailService,
        userRepository,
        randomStringGenerator
    );

    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(
        tokenService,
        secretAccessToken,
        secretRefreshToken,
    );

    const updatePasswordUseCase = new UpdatePasswordUseCase(
        encryptionService,
        userRepository
    );


    // Controllers
    const authController = new AuthController(
        loginUseCase,
        registerUseCase,
        verifyEmailUseCase,
        resetPasswordUseCase,
        forgotPasswordUseCase,
        refreshAccessTokenUseCase,
        updatePasswordUseCase
    );

    const rootController = new RootController()



    return {
        tokenService,
        userRepository,
        authController,
        rootController
    };
};