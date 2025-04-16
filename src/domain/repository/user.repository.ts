import { User } from "../entity/user.entity";

export interface UserRepository {
    create(user: Partial<User>): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByVerificationToken(verificationToken: string): Promise<User | null>;
    update(userId: string, userData: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<void>;
}