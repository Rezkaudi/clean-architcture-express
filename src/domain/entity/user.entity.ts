export interface User {
    _id?: string,
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    biography: string | null,
    phoneNumber: string | null,
    degree: string | null,
    university: string | null,
    links: {
        type: string,
        url: string
    }[] | null,

    profileImageUrl?: string | null;
    verificationToken?: string | null;
    verificationTokenExpiresAt?: Date | null;
}
