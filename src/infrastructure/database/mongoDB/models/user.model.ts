import mongoose, { Schema, Model, Document } from "mongoose";
import { User as UserType } from "../../../../domain/entity/user.entity";

type UserDocument = UserType & Document;

const linkSchema = new mongoose.Schema({
    type: { type: String },
    url: { type: String }
});

const userSchema = new Schema<UserDocument>(
    {
        _id: { type: String, default: () => crypto.randomUUID() },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        profileImageUrl: { type: String, default: null },
        isVerified: { type: Boolean, default: false },

        verificationToken: { type: String, default: null },
        verificationTokenExpiresAt: { type: Date, default: null },

        biography: { type: String, default: null },
        phoneNumber: { type: String, default: null },
        degree: { type: String, default: null },
        university: { type: String, default: null },
        links: { type: [linkSchema], default: null },
    },
    { timestamps: true }
);

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);