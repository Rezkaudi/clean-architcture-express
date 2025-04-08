// use repository as type from outer layer

import { IAuthRepository } from "../../domain/repository/user.repository"

export class SqliteAuthRepository implements IAuthRepository {

    async checkAuth(): Promise<string> {
        return "From Sqlite - checkAuth"
    }

    async register(): Promise<string> {
        return "From Sqlite - register"
    }

    async login(): Promise<string> {
        return "From Sqlite - login"
    }

    async logout(): Promise<string> {
        return "From Sqlite - logout"
    }

    async verifyEmail(): Promise<string> {
        return "From Sqlite - verifyEmail"
    }

    async resendVerificationCode(): Promise<string> {
        return "From Sqlite - resendVerificationCode"
    }

    async forgotPassword(): Promise<string> {
        return "From Sqlite - forgotPassword"
    }

    async resetPassword(): Promise<string> {
        return "From Sqlite - resetPassword"
    }
}