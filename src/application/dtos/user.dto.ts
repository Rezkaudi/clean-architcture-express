/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDTO:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - lastName
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         password:
 *           type: string
 *     LoginDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *     AuthResponseDTO:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         statusCode:
 *           type: integer
 *         message:
 *           type: string
 *         data:
 *           type: object
 *     UserInfoDTO:
 *       type: object
 *       properties:
 *         profileImageUrl:
 *           type: string
 *           nullable: true
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         biography:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *           format: email
 *         phoneNumber:
 *           type: string
 *           nullable: true
 *         degree:
 *           type: string
 *           nullable: true
 *         university:
 *           type: string
 *           nullable: true
 *         links:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               url:
 *                 type: string
 *           nullable: true
 *     ResetPasswordDTO:
 *       type: object
 *       required:
 *         - resetPasswordToken
 *         - newPassword
 *       properties:
 *         resetPasswordToken:
 *           type: string
 *         newPassword:
 *           type: string
 *     ForgotPasswordDTO:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *     UpdatePasswordDTO:
 *       type: object
 *       required:
 *         - userId
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         userId:
 *           type: string
 *         currentPassword:
 *           type: string
 *         newPassword:
 *           type: string
 *     ResendVerifyEmailDTO:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 */

export interface RegisterDTO {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
}

export interface LoginDTO {
    email: string,
    password: string,
}

export interface TokenDTO {
    name: string,
    age: number,
}

export interface SecretTokenDTO {
    token: string,
    age: string,
}

export interface ResetPasswordDTO {
    resetPasswordToken: string,
    newPassword: string,
}

export interface AuthResposnseDTO {
    accessToken: string,
    refreshToken: string
}

export interface UpdatePasswordDTO {
    userId: string,
    currentPassword: string,
    newPassword: string,
}

export interface UserInfoDTO {
    profileImageUrl: string | null,
    firstName: string,
    lastName: string,
    biography: string | null,
    email: string,
    phoneNumber: string | null,
    degree: string | null,
    university: string | null,
    links: {
        type: string,
        url: string
    }[] | null,
}