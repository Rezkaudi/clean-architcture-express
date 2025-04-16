import { UserModel } from "../database/mongoDB/models/user.model";

import { User } from "../../domain/entity/user.entity"
import { UserRepository } from "../../domain/repository/user.repository"


export class MongoUserRepository implements UserRepository {

    create = async (user: Partial<User>): Promise<User> => {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return savedUser;
    }

    findById = async (id: string): Promise<User | null> => {
        return await UserModel.findOne({ _id: id }).exec()
    }

    findByEmail = async (email: string): Promise<User | null> => {
        return await UserModel.findOne({ email }).exec()
    }

    findByVerificationToken = async (verificationToken: string): Promise<User | null> => {
        return await UserModel.findOne({ verificationToken }).exec()
    }

    update = async (userId: string, userData: Partial<User>): Promise<User | null> => {
        return await UserModel.findByIdAndUpdate(userId, { $set: userData }).exec();
    }

    delete = async (id: string): Promise<void> => {
        await UserModel.findByIdAndDelete(id).exec();
    }

}