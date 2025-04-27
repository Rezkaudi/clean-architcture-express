import { CONFIG } from '../config/env';

// Srevices
import { JwtTokenService } from '../../infrastructure/srevices/jwt-token.service';
import { BcryptPasswordHasher } from '../../infrastructure/srevices/bcrypt-password-hasher';
import { UuidGeneratorService } from '../../infrastructure/srevices/uuid-generator.service';
import { NodemailerGmailService } from '../../infrastructure/srevices/nodemailer-gmail.service';
import { CryptoRandomStringGenerator } from '../../infrastructure/srevices/crypto-random-string-generator';


// Repositories
import { MongoUserRepository } from '../../infrastructure/repository/mongo-user.repository';
import { PostgreSQLUserRepository } from '../../infrastructure/repository/postgresql-user.repository';
import { PostgreSQLPathwayRepository } from '../../infrastructure/repository/postgresql-pathway.repository';

// Use Cases
import {
    LoginUseCase,
    RegisterUseCase,
    VerifyEmailUseCase,
    ResetPasswordUseCase,
    ForgotPasswordUseCase,
    UpdatePasswordUseCase,
    RefreshAccessTokenUseCase,
    ResendVerificationUseCase
} from '../../application/use-cases/auth';

import {
    GetUserInfoUseCase,
    UpdateUserInfoUseCase,
    DeleteUserAccountUseCase,
} from '../../application/use-cases/user';

import {
    CreatePathwayUseCase,
    DeletePathwayUseCase,
    UpdatePathwayUseCase,
    GetAllPathwaysUseCase,
    GetPathwayByIdUseCase,
    GetAllUserPathwaysUseCase,
    CreateMockPathwaysUseCase,
} from '../../application/use-cases/pathway';

// Controllers
import { AuthController } from '../controllers/auth.controllers';
import { RootController } from '../controllers/root.controllers';
import { UserController } from '../controllers/user.controllers';
import { PathwayController } from '../controllers/pathway.controllers';


export const setupDependencies = () => {

    const frontEndUrl = CONFIG.FRONT_URL
    const serverUrl = CONFIG.SERVER_URL

    const secretAccessToken = CONFIG.JWT_SECRET_ACCESS_TOKEN
    const secretRefreshToken = CONFIG.JWT_SECRET_REFRESH_TOKEN

    // Repositories
    const userRepository = new PostgreSQLUserRepository();
    const pathwayRepository = new PostgreSQLPathwayRepository();
    // const userRepository = new MongoUserRepository();

    // Services
    const tokenService = new JwtTokenService()
    const uuidGeneratorService = new UuidGeneratorService()
    const randomStringGenerator = new CryptoRandomStringGenerator()
    const encryptionService = new BcryptPasswordHasher(CONFIG.SALT_ROUNDS_BCRYPT)
    const emailService = new NodemailerGmailService(CONFIG.GMAIL_USER!, CONFIG.GMAIL_PASS!)

    // Use Cases

    // 1- Auth
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
        uuidGeneratorService,
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

    const resendVerificationUseCase = new ResendVerificationUseCase(
        serverUrl,
        emailService,
        userRepository,
        randomStringGenerator
    );

    // 2- User
    const getUserInfoUseCase = new GetUserInfoUseCase(
        userRepository,
    );

    const updateUserInfoUseCase = new UpdateUserInfoUseCase(
        userRepository,
    );

    const deleteUserAccountUseCase = new DeleteUserAccountUseCase(
        userRepository,
    );

    // 3- Pathway
    const createPathwayUseCase = new CreatePathwayUseCase(
        pathwayRepository,
        uuidGeneratorService
    )

    const createMockPathwaysUseCase = new CreateMockPathwaysUseCase(
        pathwayRepository,
        uuidGeneratorService
    )

    const deletePathwayUseCase = new DeletePathwayUseCase(
        pathwayRepository
    )

    const getAllPathwaysUseCase = new GetAllPathwaysUseCase(
        pathwayRepository
    );

    const getPathwayByIdUseCase = new GetPathwayByIdUseCase(
        pathwayRepository
    );

    const updatePathwayUseCase = new UpdatePathwayUseCase(
        pathwayRepository
    )

    const getAllUserPathwaysUseCase = new GetAllUserPathwaysUseCase(
        pathwayRepository
    )

    // Controllers
    const authController = new AuthController(
        loginUseCase,
        registerUseCase,
        verifyEmailUseCase,
        resetPasswordUseCase,
        forgotPasswordUseCase,
        refreshAccessTokenUseCase,
        updatePasswordUseCase,
        resendVerificationUseCase
    );

    const userController = new UserController(
        getUserInfoUseCase,
        updateUserInfoUseCase,
        deleteUserAccountUseCase,
    );

    const pathwayController = new PathwayController(
        createPathwayUseCase,
        deletePathwayUseCase,
        updatePathwayUseCase,
        getAllPathwaysUseCase,
        getPathwayByIdUseCase,
        getAllUserPathwaysUseCase,
        createMockPathwaysUseCase
    );


    const rootController = new RootController()


    return {
        tokenService,
        userRepository,

        authController,
        rootController,
        userController,
        pathwayController
    };
};