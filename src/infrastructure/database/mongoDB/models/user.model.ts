import mongoose, { Schema, Model, Document } from "mongoose";
import { User as UserType } from "../../../../domain/entity/user.entity";

type UserDocument = UserType & Document;

const userSchema = new Schema<UserDocument>(
    {
        _id: { type: String, default: () => crypto.randomUUID() },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        profileImageUrl: { type: String, default: null },
        isVerified: { type: Boolean, default: false },
        resetPasswordToken: { type: String },
        resetPasswordExpiresAt: { type: Date },
        verificationToken: { type: String },
        verificationTokenExpiresAt: { type: Date },
    },
    { timestamps: true }
);

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);