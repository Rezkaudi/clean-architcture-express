const CREAT_USER_TABLE = `

CREATE TABLE users (
    _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "profileImageUrl" VARCHAR(255),
    "isVerified" BOOLEAN DEFAULT FALSE,
    "verificationToken" VARCHAR(255),
    "verificationTokenExpiresAt" TIMESTAMP,
    "resetPasswordToken" VARCHAR(255),
    "resetPasswordTokenExpiresAt" TIMESTAMP,
    biography TEXT,
    "phoneNumber" VARCHAR(255),
    degree VARCHAR(255),
    university VARCHAR(255),
    links JSONB DEFAULT '[]',  -- Storing links as a JSONB array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`