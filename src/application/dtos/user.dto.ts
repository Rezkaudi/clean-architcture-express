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
    verificationToken: string,
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